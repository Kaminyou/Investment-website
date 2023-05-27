def parse_personal_donation(request_instance):
    response = {}
    for k, v in request_instance.__dict__.items():
        if 'group' in k:
            response[k] = v
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
    response['group'] = user_instance.__dict__['category']
    return response
