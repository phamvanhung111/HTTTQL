from django.urls import path

from . import views

urlpatterns = [
    path("register/", views.register, name="register"),
    path("login_user/", views.loginUser, name="login_user"),
    path("getAllCategories/", views.getAllCategories, name="getAllCategories"),
    path("getAllProduct/", views.getAllProduct, name="getAllProduct"),
    path("addToCart/", views.addToCart, name="addToCart"),
    path("getByCategory/<str:id>/", views.getByCategory, name="getByCategory"),
    path("order/", views.order, name="order"),
    path("createProduct/", views.createProduct, name="createProduct"),
    path("getOrder/", views.getOrder, name="getOrder"),
    path("getDetailProduct/<str:id>/", views.getDetailProduct, name="getDetailProduct"),
    path("getByType/<str:id>/", views.getByType, name="getByType"),
    path("getAllType/", views.getAllType, name="getAllType"),
    path("getByName/", views.getByName, name="getByName"),
    path("getHistoryOrders/", views.getHistoryOrders, name="getHistoryOrders"),
    path("getOrderDetail/<str:id>/", views.getOrderDetail, name="getOrderDetail"),
    path("getByPrice/", views.getByPrice, name="getByPrice"),
    path("viewReport/", views.viewReport, name="viewReport"),
    path("kpi/", views.kpi, name="kpi"),
]
