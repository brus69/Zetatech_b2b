from django.contrib.auth.hashers import make_password

import factory
from apps.user.model import User


class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Sequence(lambda n: "username%s" % n)
    first_name = factory.Sequence(lambda n: "First Name %s" % n)
    last_name = factory.Sequence(lambda n: "Last Name %s" % n)
    email = factory.Sequence(lambda n: "email%s@example.com" % n)
    role = factory.Sequence(lambda n: "editor %s" % n)
    is_staff = False
    is_active = False
    is_superuser = False
    password = "123"

    @classmethod
    def _prepare(cls, create, **kwargs):
        kwargs["password"] = make_password(kwargs["password"])
        return super(UserFactory, cls)._prepare(create, **kwargs)

    class Meta:
        model = User
