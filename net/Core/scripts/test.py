
primes = [2]
def nt_prime(n:int):
    if len(primes) > n:
        return primes[n]
    nt_prime(n-1)
    c = max(primes)+1
    while True:
        for p in primes:
            if c % p == 0:
                c+=1
                break
        else:
            primes.append(c)
            return c
        
def get_max_prime_factor_of(n):
    p = 0
    cp = 0
    while n > 1:
        cp = nt_prime(p)
        while n%cp == 0:
            n/=cp
        p+=1
    return cp

#print(get_max_prime_factor_of(39))

n = 0
m = 1
while True:
    p = nt_prime(n)
    if p > m:
        print(p)
        m *= 10
    n+=1