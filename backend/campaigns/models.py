from django.db import models
from cloudinary.models import CloudinaryField
from django.template.defaultfilters import slugify

# Create your models here.

class Campaign(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    slug = models.SlugField(max_length=255, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    logo = CloudinaryField('Image', overwrite=True, format='jpg')

    class Meta:  # How the models behave
        ordering = ('-created_at',)  # will be in descending order

    def __str__(self):
        return self.title  # showed in Django Admin

    def save(self, *args, **kwargs):
        # will slugify the title.
        # Convert spaces to hyphens.
        # Remove characters that aren't alphanumerics, underscores, or hyphens.
        # Convert to lowercase. Also strip leading and trailing whitespace.
        to_assign = slugify(self.title)

        # the url has to be unique
        if Campaign.objects.filter(slug=to_assign).exists():
            to_assign = to_assign+str(Campaign.objects.all().count())
            # if there are two slugs with same name , the second one will be called <slug_name>2

        self.slug = to_assign

        super().save(*args, **kwargs)  # sending back to super class


class Subscriber(models.Model):
    campaign = models.ForeignKey(to=Campaign, on_delete=models.CASCADE)
    email = models.EmailField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:  # How the models behave
        ordering = ('-created_at',)  # will be in descending order

    def __str__(self):
        return self.email  # showed in Django Admin
