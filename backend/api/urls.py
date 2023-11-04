from django.urls import path
from .views import *
from .views_admin import *

urlpatterns = [
    path('register', Register.as_view()),
    path('signin', Login.as_view()),
    path('user_view', UserView.as_view()),
    path('user_logout', UserLogout.as_view()),
    path('update_user', UserEdit.as_view()),
    
    path('admin_signin', Admin_signin.as_view()),
    path('all_users', All_Users.as_view()),
    path('add_user', AddUser.as_view()),
    path('delete_user/<int:user_id>', DeleteUser.as_view()),
    path('edit_user/<int:user_id>', EditUser.as_view())
]
