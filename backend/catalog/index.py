"""
Business: Загружает YML-фид t-sib.ru, отдаёт только товары category 405 с фото/параметрами/описанием.
Args: event с httpMethod (GET/OPTIONS); context — объект с request_id.
Returns: JSON {products: [...]} с полями id, name, price, currency, vendor, description, pictures, params.
"""
import json
import urllib.request
import xml.etree.ElementTree as ET
from typing import Any

FEED_URL = "https://t-sib.ru/upload/catalog.xml"
TARGET_CATEGORY = "405"


def handler(event: dict, context: Any) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400',
            },
            'body': '',
        }

    try:
        req = urllib.request.Request(FEED_URL, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=25) as resp:
            xml_data = resp.read()

        root = ET.fromstring(xml_data)
        shop = root.find('shop')
        if shop is None:
            return _error('No shop element')

        offers_el = shop.find('offers')
        if offers_el is None:
            return _error('No offers element')

        products = []
        for offer in offers_el.findall('offer'):
            cat = offer.findtext('categoryId', '').strip()
            if cat != TARGET_CATEGORY:
                continue

            pictures = [p.text.strip() for p in offer.findall('picture') if p.text]

            params = []
            for prm in offer.findall('param'):
                pname = (prm.get('name') or '').strip()
                pval = (prm.text or '').strip()
                if not pname or not pval:
                    continue
                if pname.upper() == 'GUID':
                    continue
                params.append({'name': pname, 'value': pval})

            description = offer.findtext('description', '') or ''
            description = description.strip()

            price_raw = offer.findtext('price', '').strip()
            try:
                price_num = float(price_raw) if price_raw else 0
            except ValueError:
                price_num = 0

            products.append({
                'id': offer.get('id', ''),
                'name': offer.findtext('name', '').strip(),
                'vendor': offer.findtext('vendor', '').strip(),
                'price': price_num,
                'priceText': price_raw,
                'currency': offer.findtext('currencyId', 'RUR').strip(),
                'url': offer.findtext('url', '').strip(),
                'description': description,
                'pictures': pictures,
                'params': params,
            })

        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'public, max-age=600',
            },
            'isBase64Encoded': False,
            'body': json.dumps({'products': products, 'count': len(products)}, ensure_ascii=False),
        }
    except Exception as e:
        return _error(f'{type(e).__name__}: {e}')


def _error(msg: str) -> dict:
    return {
        'statusCode': 500,
        'headers': {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Origin': '*',
        },
        'isBase64Encoded': False,
        'body': json.dumps({'error': msg}, ensure_ascii=False),
    }
