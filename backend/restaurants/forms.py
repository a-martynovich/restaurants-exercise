from django.contrib.auth.forms import UserCreationForm
from django import forms
from django.contrib.auth.models import Group, User


class MyUserCreationForm(UserCreationForm):
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    email = forms.EmailField(required=True)
    role = forms.ChoiceField(choices=(
        ('visitors', 'Visitor'),
        ('owners', 'Owner'),
        ('admins', 'Admin')
    ), required=True)

    def save(self, commit=True):
        user: User = super().save(commit=False)
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        user.email = self.cleaned_data['email']
        role = self.cleaned_data['role']
        if commit:
            user.save()
            group = Group.objects.get(name=role)
            user.groups.add(group)
        return user