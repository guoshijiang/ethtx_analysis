from django.urls import path
from frontend.views import index, decoded_transaction, tx_list


urlpatterns = [
    path(r"", index, name="index"),
    path(r"tx_list", tx_list, name="tx_list"),
    path(r'decoded_transaction', decoded_transaction, name="decoded_transaction"),
]