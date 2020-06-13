//combinators
const I = a => a // idiot/identity
const M = f => f(f) // mockingbird
const K = a => b => a // kestrel (const))
const KI = a => b => b // kite
const C = f => a => b => f(b)(a) // cardinal
const B = f => g => a => f(g(a)) // bluebird (compose)
const B1 = f => g => a => b => f(g(a)(b))
const Th = C(I) // thrush (af -> f(a)) (hold an argument)
const V = a => b => f => f(a)(b) // vireo (hold a pair of arguments)

// boolean
const T = K // Church encoded true
const F = KI // Church encoded false

const not = p => p(F)(T)
const and = p => q => p(q)(p)
const or = p => q => p(p)(q)
const nand = p => q => not(and(p)(q))
const nor = p => q => not(or(p)(q))

const beq = p => q => p(q)(not(q))
const bne = p => q => not(beq(p)(q))
const xor = p => q => not(beq(p)(q))

// ordinal values
const zero = f => a => a
const succ = n => f => B(f)(n(f)) // const succ = n => f => a => f(n(f)(a))
const n0 = zero
const n1 = succ(zero)
const n2 = succ(n1)
const n3 = succ(n2)
const n4 = succ(n3)
const n5 = succ(n4)
const n6 = succ(n5)
const n7 = succ(n6)
const n8 = succ(n7)
const n9 = succ(n8)

// math
const add = n => k => n(succ)(k)
const mult = B // point-free compose n, k times
const pow = Th // pow = n => k => k(n)
const pred = n => fst(n(phi)(V(n0)(n0)))
const sub = n => k => k(pred)(n) // n-k

// logical
const is0 = n => n(K(F))(T)
const leq = n => k => is0(sub(n)(k)) // n <= k
const eq = n => k => and(leq(n)(k))(leq(k)(n))
const gt = B1(not)(leq) // n > k

// tuple
const pair = V
const fst = p => p(K)
const snd = p => p(KI)
const phi = p => pair (snd(p)) (succ(snd(p))) // copy 2nd to 1st, inc 2nd

// js interop
const log = a => console.log(a)
T.inspect = () => 'True'
F.inspect = () => 'False'
const jsnum = n => n(x => x+1)(0)
const n = k => k === 0 ? zero : succ(n(k-1)) // ordinal to successors of zero

log(gt(n7)(n6))
log(eq(n5)(n5))
log(jsnum(pow(n3)(n4)))