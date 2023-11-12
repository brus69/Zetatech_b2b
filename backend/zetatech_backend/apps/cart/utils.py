def get_cart_redis_key(session_id: str):
  return f'cart_session_id:{session_id}'