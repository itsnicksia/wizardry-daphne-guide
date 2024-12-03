Turn Ordering
=============

> :warning: Purpose of this text is to propose a theory for understanding the
general mechanics of turn ordering for practical purposes. It is largely
guesswork and much of it is likely incorrect and/or incomplete. Tests and
observations used as basis for the guessing are presented in the footnotes.

Terminology
-----------

| Term     | Synopsis |
|----------|----------|
| Turn     | A single action of a unit (player or enemy) |
| Round    | One round is everyone getting a single turn (with exceptions) |
| `ASPD`   | Individual unit's Action Speed stat |
| `OFFSET` | Predefined turn ordering offset, same for all units |
| `ORD`    | Dynamically calculated value for determining turn order |

Mechanics
---------

At the beginning of a fight, all units are assigned an `ORD` value of
(`ASPD + OFFSET`). Turn ordering is determined based on these values.

For example, assume that `OFFSET` is 400[^1]. With unit `ASPD` stats from 10 to
100, this gives `ORD` values in the range of 410 to 500.

Skills that affect action speed are reflected in the `ORD` value. The value
carries over to the next round, meaning if eg. Delay Attack would decrease
`ORD` by 50[^2], then for a starting `ORD` of 430, for rest of the fight `ORD` is
480[^3].

In case that `ORD` drops to 0, the turn for that round is missed entirely and
`ORD` is reset back to (`ASPD + OFFSET`) in the beginning of next round.

For speed increase[^4], same logic is applied; if (`ORD - OFFSET`) is positive, then
that value determines the order for a second turn in that round, before being
reset.

Footnotes
---------

[^1]: A Debra with `ASPD` of 95 against a Lv.30 goblin gets two turns in a round
every six rounds. This would put `OFFSET` roughly somewhere between 360 and 432.
Lv.30 goblin was tested to have `ASPD` of around 23.

[^2]: A party of six thieves all doing Delay Attack on a Hobgoblin cause the
Hob to skip a turn every second round - although only a few rounds total were
tested, since the Hob dies to the attacks. Further testing is needed to more
accurately narrow down the actual delay value of Delay Attack; it could be
anywhere between around 30 and 72.

[^3]: When Delay Attack is performed, the enemy typically drops to the bottom
of the turn order list. It also *stays* there in all subsequent rounds.

[^4]: Casting `PORTO` gives two turns in a round, typically in the second round of
the spell being active.
