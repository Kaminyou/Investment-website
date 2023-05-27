from hashlib import sha256


def get_sha256(s: str) -> str:
    return sha256(s.encode('utf-8')).hexdigest()
