from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

import factory

User = get_user_model()

class UserFactory(factory.django.DjangoModelFactory):
    username = factory.Sequence(lambda n: "username%s" % n)
    first_name = factory.Sequence(lambda n: "First Name %s" % n)
    last_name = factory.Sequence(lambda n: "Last Name %s" % n)
    role = factory.Sequence(lambda n: "editor %s" % n)
    is_staff = True
    is_active = True
    is_superuser = False
    password = "password"
    avatar = factory.django.ImageField(color='blue')

    @classmethod
    def _prepare(cls, create, **kwargs):
        kwargs["password"] = make_password(kwargs["password"])
        return super(UserFactory, cls)._prepare(create, **kwargs)

    class Meta:
        model = User
