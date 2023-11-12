import uuid


class SessionMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response


    def __call__(self, request):
        response = self.get_response(request)

        if not "session_id" in request.COOKIES:
            response.set_cookie("session_id", str(uuid.uuid4()), max_age=60 * 60 * 24 * 7, httponly=True)
        else:
            response.set_cookie("session_id", request.COOKIES['session_id'], max_age=60 * 60 * 24 * 7, httponly=True)

        return response