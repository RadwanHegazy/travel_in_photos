from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from PIL import Image, ImageFilter
from random import randint

# Create your views here.


def index (request) :
    return render(request,'index.html')


@csrf_exempt
def process (request) :
    
    person = request.FILES['user']
    bg_dir = 'static/places/' + request.POST['bg']
    
    bg = Image.open(bg_dir)

    bg = bg.resize(size=(1000, 1000))
    bg = bg.crop((300, 0,800,800))
    bg = bg.filter(ImageFilter.BLUR)


    person = Image.open(person)

    hand = Image.open('static/hand.png')


    # add the user
    resize = (159, 280)

    person = person.resize(size=resize)
    hand = hand.copy()
    hand.paste(person,box=(hand.width - person.width - 120,92))


    # add the the hand on the bg
    hand = hand.resize(size=( hand.width * 2   , hand.height * 2  ))
    hand = hand.reduce(2)


    bg = bg.copy()
    bg.paste(hand,box=(-100,bg.height - hand.height - 200),mask=hand)

    code = ''
    for i in range(0,10):code += f'{randint(0,100)}'
    save_dir = f'static/user/{code}.png'

    bg.save(save_dir)

    return HttpResponse(save_dir)
