def parse_request_instances(request_instances):
    response = []
    for request_instance in request_instances:
        response.append(parse_request_instance(request_instance))
    return response


# def parse_request_instance(request_instance):
#     response = {}
#     response['date'] = request_instance.__dict__['dateUpload']
#     response['model'] = request_instance.__dict__['modelName']

#     response['url'] = request_instance.__dict__['websiteURL']
#     response['slideName'] = request_instance.__dict__['slideName']
#     response['slideTag'] = request_instance.__dict__['slideTag']
#     response['label'] = request_instance.__dict__['slideLabel']

#     response['resolution'] = request_instance.__dict__['imgPixelResolution']
#     response['summary'] = request_instance.__dict__['summary']
#     response['detail'] = request_instance.__dict__['submitUUID']
#     response['status'] = request_instance.__dict__['status'].name
#     response['statusInfo'] = request_instance.__dict__['statusInfo']

#     response['downloadZip'] = parse_download_status(request_instance.__dict__['downloadZip'])
#     response['downloadCsv'] = parse_download_status(request_instance.__dict__['downloadCsv'])

#     return response


def parse_request_instance(request_instance):
    response = {}
    response['date'] = request_instance.__dict__['dateUpload']
    response['mode'] = request_instance.__dict__['mode']
    response['detail'] = request_instance.__dict__['submitUUID']
    response['status'] = request_instance.__dict__['status'].name
    response['statusInfo'] = request_instance.__dict__['statusInfo']

    response['url'] = request_instance.__dict__['websiteURL']
    response['slideName'] = request_instance.__dict__['slideName']
    for extra_key in ['slidePath', 'slideTag', 'patchTag', 'slideExtension', 'patchSize', 'toTag', 'inferSize', 'fromTag', 'toTags', 'stainType', 'criteriaMode', 'criteria', 'signalThreshold', 'contourDilate', 'membraneDilate']:
        if extra_key in request_instance.__dict__:
            response[extra_key] = request_instance.__dict__[extra_key]

    return response


def parse_personal_donation(request_instance):
    response = {}
    for k, v in request_instance.__dict__.items():
        if 'group' in k:
            response[k] = v
    return response

def get_fake_response(request_instances):
    response = [
        {
            'date': 'aaabbb',
            'mode': 'crop',
            'status': 'DONE',
            'url': 'http://ssss.com',
            'detail': 'aaa',
            'slideName': 'abc',
            'slidePath': 'addw',
            'slideExtension': 'qptiff',
            'patchSize': 512,
        },
        {
            'date': 'aaab4bb',
            'mode': 'infer',
            'status': 'INQUEUE',
            'url': 'http://ssss.com',
            'detail': 'bbb',
            'slideName': 'abc',
            'toTag': 'DAPI',
            'inferSize': 555,
        },
        {
            'date': 'aaabrbb',
            'mode': 'synchronize',
            'status': 'COMPUTING',
            'detail': 'ccc',
            'url': 'http://ssss.com',
            'slideName': 'abc',
            'fromTag': 'DAPI',
            'toTags': 'Opal 480,Opal 520',
        },
    ]
    return response

def get_fake_request_info(uuid):
    response = {
        'aaa':
        {
            'date': 'aaabbb',
            'mode': 'crop',
            'status': 'DONE',
            'url': 'http://ssss.com',
            'detail': 'aaa',
            'slideName': 'abc',
            'slidePath': 'addw',
            'slideExtension': 'qptiff',
            'patchSize': 512,
            'statusInfo': 'none',
        },
        'bbb':
        {
            'date': 'aaab4bb',
            'mode': 'infer',
            'status': 'INQUEUE',
            'url': 'http://ssss.com',
            'detail': 'bbb',
            'slideName': 'abc',
            'toTag': 'DAPI',
            'inferSize': 555,
            'statusInfo': 'none',
        },
        'ccc':
        {
            'date': 'aaabrbb',
            'mode': 'synchronize',
            'status': 'COMPUTING',
            'detail': 'ccc',
            'url': 'http://ssss.com',
            'slideName': 'abc',
            'fromTag': 'DAPI',
            'toTags': 'Opal 480,Opal 520',
            'statusInfo': 'none',
        },
    }
    return response[uuid]



def parse_download_status(download_status: str):
    if download_status is None:
        return "prepare"
    else:
        return download_status


def parse_report_instances(report_instances):
    response = []
    for report_instance in report_instances:
        response.append(parse_report_instance(report_instance))
    return response


def parse_report_instance(report_instance):
    response = {}
    # response['roiID'] = report_instance.__dict__['roiId']
    # response['negative'] = report_instance.__dict__['negativeCnt']
    # response['postive'] = report_instance.__dict__['positiveCnt']
    # response['undefined'] = report_instance.__dict__['undefinedCnt']
    # response['download'] = report_instance.__dict__['downloadLink']

    response['cropFileName'] = report_instance.__dict__['cropFileName']
    response['createStatus'] = report_instance.__dict__['createStatus'].name
    response['annotateStatus'] = report_instance.__dict__['annotateStatus'].name
    response['moveStatus'] = report_instance.__dict__['moveStatus'].name
    return response


def parse_list_to_value_label_form(list_of_item: list):
    output = []
    for item in list_of_item:
        output.append({"value": item, "label": item})
    return output


def parse_user_instances(user_instances):
    response = []
    for user_instance in user_instances:
        response.append(parse_user_instance(user_instance))
    return response


def parse_user_instance(user_instance):
    response = {}
    response['account'] = user_instance.__dict__['account']
    return response
