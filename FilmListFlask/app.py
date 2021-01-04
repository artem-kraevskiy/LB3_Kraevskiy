from flask import Flask, url_for, request, jsonify
from markupsafe import escape
app = Flask(__name__)
filmList = []

@app.route('/', methods=['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/<filename>', methods=['GET'])
def src(filename=None):
    return app.send_static_file(filename)

@app.route('/films', methods=['GET'])
def get_list():
    return jsonify(filmList)

@app.route('/last-id', methods=['GET'])
def get_id():
    return str(int(filmList[len(filmList) - 1]["id"]) + 1) if len(filmList) > 0 else '0'

@app.route('/films', methods=['PUT'])
def add_film():
    obj = request.get_json()
    if 'id' in obj and 'nazv' in obj and 'reit' in obj and 'zanr' in obj and 'opis' in obj:
        filmList.append(obj)
        return '',201
    return '', 400

@app.route('/films', methods=['POST'])
def edit_film():
    obj = request.get_json()
    if 'id' in obj and 'nazv' in obj and 'reit' in obj and 'zanr' in obj and 'opis' in obj:
        i = 0
        while i < len(filmList):
            if filmList[i]['id'] == obj['id']:
                break
            i+=1

        if i < len(filmList):
            filmList[i]['nazv'] = obj['nazv']
            filmList[i]['reit'] = obj['reit']
            filmList[i]['zanr'] = obj['zanr']
            filmList[i]['opis'] = obj['opis'] 
            return '', 202
        else:
            return '', 400


@app.route('/films', methods=['DELETE'])
def delete_film():
    obj = request.get_json()
    i = 0
    while i < len(filmList):
        if str(filmList[i]['id']) in obj:
            del filmList[i]
            continue
        i+=1
    return '', 202