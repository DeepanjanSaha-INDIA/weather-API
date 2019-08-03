import requests as rq
import json
import sys

api_key = '644187bc2d878b58466c9eae74913e1a'
credencials = {'un':'deepsaha20', 'pw':'openweatherdeep'}

with open('iso_country_code.txt','r') as file:
    match=json.load(file)

base_url = r'http://api.openweathermap.org/data/2.5/weather'

query_string = {'q':None, 'lat':None, 'lon':None, 'zip':None, 'APPID': api_key}

s={'q': None, 'lat': None, 'lon': None, 'zip': None, 'APPID': '644187bc2d878b58466c9eae74913e1a'}


if (sys.argv[1]=='city'):
    city = sys.argv[2]
    country = sys.argv[3]
    if city==None or not city.replace(' ','').isalpha():
        city = 'Kolkata'
    if country==None:
        country = 'India'
    
    query_string['q']='{},{}'.format(city,match[country.lower()])
    # print(query_string)

if (sys.argv[1]=='pincode'):
    zip_code = sys.argv[2]
    country = sys.argv[3]
    if zip_code==None or not zip_code.isdigit():
        zip_code = '700115'
    if country==None:
        country = 'India'
    query_string['zip']='{},{}'.format(zip_code,match[country.lower()])
    # print(query_string)

if (sys.argv[1]=='coordinates'):
    lati = sys.argv[2]
    longi = sys.argv[3]
    status_lati,status_longi=True,True

    for temp in lati.split('.'):
        status_lati &= temp.isdigit()
    for temp in longi.split('.'):
        status_longi &= temp.isdigit()

    status_lati &= (len(lati.split('.'))<3)
    status_longi &= (len(longi.split('.'))<3)

    if lati==None or not status_lati:
        lati = '88.88'
    if longi==None or not status_longi:
        longi = '22.22'
    query_string['lat']=str(lati)
    query_string['lon']=str(longi)
    # print(query_string)

res = rq.get(base_url, params = query_string)
data = res.text
data = data.replace(r"'",r'"')
print(data)
sys.stdout.flush()