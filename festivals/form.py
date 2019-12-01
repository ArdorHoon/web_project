from django import forms

from .models import Festival

class UploadFileForm(forms.ModelForm):
    class Meta:
        model = Festival
        fields = ('name', 'date', 'place', 'price', 'pic')

    def __init__(self, *args, **kwargs):
        super(PostForm, self).__init__(*args, **kwargs)
        self.fields['pic'].required = False