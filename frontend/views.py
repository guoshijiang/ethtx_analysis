# encoding=utf-8
from django.shortcuts import redirect, render
from typing import Optional
from common.helpers import ethtx
from frontend.deps import get_eth_price


def index(request):
    ethtx_version = 1.0
    return render(request, "monitor/index.html", locals())


def tx_list(request):
    return render(request, "monitor/tx_list.html", locals())


def decoded_transaction(request):
    tx_hash = request.GET.get("tx_hash", "")
    chain_id = request.GET.get("network", "mainnet")
    if tx_hash in ["", None] or chain_id in ["", None, "0"]:
        return render(request, "monitor/transaction.html", locals())
    tx_hash = tx_hash if tx_hash.startswith("0x") else "0x" + tx_hash
    chain_id = chain_id
    decoded_transaction = ethtx.decoders.decode_transaction(
        chain_id=chain_id, tx_hash=tx_hash
    )
    decoded_transaction.metadata.timestamp = (
        decoded_transaction.metadata.timestamp.strftime("%Y-%m-%d %H:%M:%S")
    )
    print(decoded_transaction)
    eth_price = 1980 # get_eth_price()
    transaction = decoded_transaction.metadata
    eth_fee = transaction.gas_used * transaction.gas_price / 10 ** 9
    usd_fee = "{:,.2f}".format(transaction.gas_used * transaction.gas_price * eth_price / 10 ** 9)
    gas_used = "{:,}".format(transaction.gas_used)
    gas_used_gwei = "{:,.2f}".format(transaction.gas_price )
    events = decoded_transaction.events
    events_num = len(events)
    call = decoded_transaction.calls
    transfers = decoded_transaction.transfers
    balances = decoded_transaction.balances
    # print("decoded_transaction===", decoded_transaction)
    return render(request, "monitor/transaction.html", locals())






