from djoser.serializers import UserCreateSerializer as BaseUserRegistrationSerializer


class UserRegistrationSerializer(BaseUserRegistrationSerializer):
    class Meta(BaseUserRegistrationSerializer.Meta):
        fields = ('email', 'first_name', 'last_name', 'password', 'phone' )
