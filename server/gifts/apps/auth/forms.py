from allauth.account.forms import LoginForm
from allauth.account.forms import ResetPasswordForm
from allauth.account.forms import ResetPasswordKeyForm
from allauth.account.forms import SignupForm
from django import forms


class CustomSignupForm(SignupForm):
    name = forms.CharField(
        max_length=50,
        label="Name",
        widget=forms.TextInput(
            attrs={
                "type": "text",
                "placeholder": "Jane Smith",
            }
        ),
    )

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""
        self.fields["email"].label = "Email"
        self.fields["email"].widget.attrs["placeholder"] = "name@email.com"
        self.fields["password1"].widget.attrs["placeholder"] = "●●●●●●●●●●●●●●"

    def save(self, request):
        user = super(CustomSignupForm, self).save(request)

        full_name = self.cleaned_data["name"]
        name_parts = full_name.split(maxsplit=1)

        if len(name_parts):
            user.first_name = name_parts[0]

        if len(name_parts) > 1:
            user.last_name = name_parts[1]

        user.save()
        return user


class CustomLoginForm(LoginForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""
        self.fields["login"].label = "Email"
        self.fields["login"].widget.attrs["placeholder"] = "name@email.com"
        self.fields["password"].widget.attrs["placeholder"] = "●●●●●●●●●●●●●●"


class CustomResetPasswordForm(ResetPasswordForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""
        self.fields["email"].label = "Email"
        self.fields["email"].widget.attrs["placeholder"] = "name@email.com"


class CustomResetPasswordKeyForm(ResetPasswordKeyForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.label_suffix = ""
        self.fields["password1"].label = "Password"
        self.fields["password1"].widget.attrs["placeholder"] = "●●●●●●●●●●●●●●"
        self.fields["password2"].label = "Confirm password"
        self.fields["password2"].widget.attrs["placeholder"] = "●●●●●●●●●●●●●●"
