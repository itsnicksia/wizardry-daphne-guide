# Gillion    

**Race**: Human  
**Gender**: Male  
**Type**: Neutral  
**Personality**: Evil  
**Starting Class**: Fighter  
**Class Change**:   
**Role**: Damage  

??? info "Portraits"
    === "Fighter"
        ![](../img/gillion-fighter.jpg)

## Skills

!!! info "Unique Skill (Inheritable)"
    === "Cry of Ruin"
       {{ get_skill_description("Cry of Ruin") }}  
       
!!! info "Unique Skill (Not Inheritable)"
    === "Cursed-Blood Resonance"
       {{ get_skill_description("Cursed-Blood Resonance") }}  
       
!!! info "Discipline Skill"
    === "Vengeful Oath Conditioning"
       {{ get_skill_description("Vengeful Oath Conditioning") }}  
       
## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    There's a lot to unpack here. Read on if you're interested in specifics, but for those that just want some advice on whether or not to pull without knowing the why, I recommend skipping.

    First off, we'll talk about the easy one - his passive, Cursed-Blood Resonance, provides accuracy, action speed, and approximately a 10% damage increase at the cost of a loss of 5% of his maximum HP. Note that if he's below 5% of his maximum, this passive can kill him.

    Now, his active skill is much more interesting. Cry of Ruin has a lot going on. First, it's a medium attack that is a Dark type physical attack, which makes it subject to damage reduction when fighting Undead. Second, this attack is locked in to close range, regardless of the range of the equipped weapon, and is a single hit, so you absolutely do not want to be using it with a 1h sword or dagger. Third, the self damage costs 25% of his maximum HP (35% when inherited to someone else) and is additive with Cursed-Blood Resonance. This means he takes recoil damage equal to 30% of his maximum HP when he uses this skill and can absolutely kill himself with it. This damage is applied after any end-of-attack or enemy kill heals, but prior to an end-of-battle heal, such as Lana's passive HP restore.

    On to the weird stuff - the splash damage of his attack is very unique because it is based off the actual enemy formation and positioning. We don't have any real insight into those mechanics, but in general, this splash damage takes the damage dealt to the primary target and deals 35%, plus or minus X, of that damage to adjacent enemies. This splash damage is considered "true" damage, as it is based solely on the initial damage dealt (including factors like Slayer/Type weapons, Surety, and other damage boosts). If there are any targets adjacent to those receiving splash damage, they get hit with 35% of the splash damage.

    As an example, suppose you deal 3000 damage to target A in this enemy formation, this illustration shows the magnitude of damage that targets B and C would receive:

    ```
    A (3000) - B (1050) - C (368)
    ```

    When fighting undead, this splash damage will appear to be reduced further in the text display, however the numeric value is still calculated at the 35% as expected.

    Earlier, I mentioned the "plus or minus X." This is where things get really weird. Enemy positions and formations are somewhat variable, so while 35% is pretty constant for most enemy formations, you'll occasionally encounter formations where enemies are slightly closer together or slightly further apart. These variances actually impact the splash damage, so against some enemy formations, you might see splash damage closer to 45% or 55% of the original damage, while in others, you might see splash damage closer to 15% or 25% of the original damage. Annoying, right?

    His Discipline is fine - it's attack power and accuracy.

    So, what does all this mean? Well, this is our third damage dealing legendary recently that follows the high risk, high reward approach after Shiou and Galbadus, with the caveat that he's probably the highest risk for the lowest reward. If you plan to use his active skill, you effectively have to treat him as having 30% less effective HP, which can be very detrimental in some fights. While his attack is our first true physical row attack (Rinne's MoF targets the enemy's MDEF instead of DEF), the nature of the splash damage makes it not very well suited for acting as a row damage attack. If you're using it to farm, you'll constantly have to be restoring his HP between fights. If you're using it for progression, many of the encounters where you might want to deal large levels of row damage against difficult enemies (certain Emergency Occurrence strategies, for example), have enough enemies that lowering Gillion's effective HP is a bad idea.

    There are some unique positives to this skill, though. The first is that the splash damage being true damage could be helpful to chip away at any future encounters were we might have enemies that are largely immune to physical damage (depending completely on what those enemy formations might be). Similarly, there could be future encounters where there is shared damage across targets, and the splash damage would let you essentially double-dip by dealing regular and splash damage to the shared HP pool. The second is that if you inherit his skill to the MC, you give the MC a very easy way to force a flame if an encounter starts going poorly.

    These use cases are far and few between, though. I wouldn't go as far as saying Gillion is a bad adventure. He's essentially Wizardry's version of Dark Knight Cecil from Final Fantasy, and Cecil is awesome. I love the idea of the Dark Knight mechanics, but unfortunately, they don't lend themselves well to the mechanics in this game, and he's definitely a risky adventurer to use for very little unique gain.

??? info "Karkarov's Analysis"

    First off I have to hand it to Drecom, from a visual design perspective they have been hitting home runs effectively every new character since Galbadus, and Gillion is no exception.  If you are a dark fantasy fan, or love yourself some Dark Souls like I do, there is a lot to visually like about how this character is designed and created.  He even has cool specific graphical and audio flair that is new to the game, IE in combat he wears a full face helmet, but post combat in some animations you actually see him take the helmet off, and when he speaks with it on vs off his voice will sound normal or muffled based on if he is wearing it.  I personally really appreciate these design details and the work Drecom is doing here, they could be brain dead like every other Gacha and just making "hot woman #5 with cat tail and ears, make the butt bigger this time" but they are actally being creative instead.

    That said what about his mechanical performance?  Well.... I can tell the visual and mechanical designers are probably not the same person...  Typically when a new Inheritable Attack Skill (especially one as complex as this) is introduced I try to write some kind of analysis and detail of it's function.  In this case I am not going to go into those details as Axolotl has already covered it exteremely well in his analysis.  So if you want the critical mechanical explanation please read his analysis he did a wonderful job on it.  Instead I am going to focus on value or lack thereof, of "Cry of Ruin".

    Well first off lets be real, costing 25% of the users hp (or 35% on inherit) is downright criminal for the damage it does.  If the damage were like.... double it would be worth tossing around, but it is around HA3 damage at level 1.  It is also close range only, so you can't use it from the back row at all.  On the bright side leveling it doesn't increase the hp cost so if you are insane you can level it to improve the damage without eating more damage in return.  Just know that level for level single target it also does less damage than Moonlit Axe Toss of debuffing and I can use it from any row I want.  Meanwhile it has the same sp cost and again... 25% (or more) of your hp lost for using it.  Heavy Attack starts to pass it as well single target wise past level 3 for again similar SP cost (HA 5 costs the same as Cry Cry Cry 3 but does more "target damage").

    Now before you stop the presses and damn this skill to the levels of Gerard and Gerulf attack skills (aka totally irrelevant and never worth using) there are SOME situations where it may be valuable.  
    
    For example, if you have an average or low defence enemy standing beside a nigh invulnerable massive defense enemy.  Since the splash damage is calculated only on the target damage this will deal effective damage to Mr Invulnerable.  An example of this would be the Golem Duo Superboss fight.  It is also honestly pretty effective against GWO3 by targetting his much softer tentacles, especially when the t rex armed body is buffed.  There is also one niche use as an inherit, it's a way to controllably drop Shious HP into Ephemeral / Water Formation levels while still doing ok damage, but without also putting a giant aggro target on Shiou's face which many Samurai skills do.  Lastly and quite hilariously, it does have value as a "lets just reset" tool.  You can use it to forcibly kill a character (yes spike damage you take for using it can kill you), then you can just intentionally fail the rez minigame to kill the MC. Boom you got a quick flame rez or "accept death" in a fight/run you know you aren't winning.

    Now that we have covered his crappy Emo Crybaby skill, what about the rest?  Well frankly the rest kinda makes me mad the skill is so bad.  His discipline is good, it is Accuracy and Attack Power, could have been surety but how often do I type that?  As a character his Dark element isn't the most meta stats wise but it does give him a little Luck trait kicker and is very useful defensively in many of the games hardest fights (as of 10/31/25 when this was written).  His alignment is also Neutral which is a big deal because it gives him the most versatility from a fromation buff perspective and matters alot because of the next thing...

    What about his passive uninheritable skill?  Ok upfront yes, as a result of "Cursed Blood Resonance" if you give him a two handed weapon (any two hand weapon) he will take 5% HP loss on attack.  Yes any attack.  Heavy attack?  Check.  Regular attack? Check.  Casting Feru with a two handed staff?  Check.  Counter attack?  Absolutely.  Perform an attack and miss?  Of course you take 5%.  Follow Up Attack?!?!?? Thankfully no, but you did a normal attack to proc it already.  Also he wont take 5% when casting buffs, debuffs, or healing spells, I checked.
    
    However... this is a BIG one... He gains Action Speed, Accuracy, and +10% damage when using a two hander.  Combine this with his element and alignment... you are looking at a Fighter who in exchange for 5% HP loss can run the Alice and Elise formation buff at the same time while adding his own 10% kicker.  This means Gillion can get a higher two hand damage "just standing there" buff than any other character in the game. Meanwhile as bad as 5% seems... is Lana in your party with her passive heal leveled?  Unless the fight goes longer than 2 rounds or Gillion actually takes real damage from the enemies the Lana heal will cover the 5%.  Then he can also use the Arboris formation buff, Red Beards too, etc etc etc.  This guy simply fits in any team comp you can imagine that isn't "good or evil only" and works.

    So he is potentially the best dps auto unit in the game (just put Elise behind him with a spear and Lana as always in the front row), and in actuality has real potential for manual use as a very serious DPS unit.  In my optinion the 5% sucks, but not so much it makes the passive skill bad.  It is not bad, I think it's actually great.  That said, Gillion is definitely not a new player friendly character despite being a fighter, and his inheritable attack is too niche to be called "good", it's kinda bad for normal play.  

??? info "Shiro's Analysis"

    Starting with inheritance. It’s goddamn amazing. Low cost, hits hard. The downgrade? HP loss. So basically running him requests you to run 1 priest in a team instead of 6 full physical. Is it worth that one slot? From what I’ve experienced it definitely is. The damage to the main target is huge. Bigger than DTS from my experience. But I’m not sure about the precise difference unless I’ll inherit one to him. But the main point is AoE. It’s great, but only for him only. Unlike Rinne which is a great inheritance option for others, this is… mostly beneficial only for him as it forces you for front only AoE, so you lose the flexibility for more damage. And you lose 35% instead of 25% HP when it’s inheritance.

    Moving to his passive. It’s kind of good with questionable demerit that sometimes might be really an issue. While his buff to DMG + stats are good from it. And losing 5% per attack is usually not an issue… he also loses it on counterattack. So if you by accident survive lethal damage thanks to knight passive to end on 1 HP and you’ll counter… yeah… you get my point.

    Moving to his discipline. It’s ATK+ACC. Nothing special so the main focus will be on upgrading his skill. Especially since self DMG is % so getting more HP from inheritances/disc lvls doesn’t help that much.

    To sum it up. Gillian is great and terrible depending on the scenario. If you run him with Lana/have Lana inheritance on MC you can ignore his passive demerit. If you run him with a priest you don’t need to worry at all. His dmg is solid enough to help on bosses with multiple enemies. But… if you run him solo without sustain then he’s performing as quite a mediocre unit. And unlike Shiou and Galba who were “fake” risk - reward units (one had just bonus skill on low HP that could be ignored, and another could just evade to hit hard) then this time Gillian is actual risk-reward character. His HP loss appears every time for great damage tradeoff. Is he must-pull or game changing character? Definitely not. Is he good? Yes. But he’s heavily team dependent so take it in mind when you’ll want to use him.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Pretty easy pass here for me. The distance based damage and recoil damage are just too unreliable for me to consider running him.

??? note "Karkarov's Pull Plan"
    Drecom once again was cooking something but it is an acquired taste.  I used this analogy when discussing this character with others and will again.  Gillion is just like the Jean Claude Van Damme Street Fighter movie.  It's a terrible Street Fighter movie, but if you can convince yourself it isn't about Street Fighter and the similarities are just a coincidence you can have a great Tuesday by enjoying it for what it is.  A great schlocky B Movie where Raul Julia over delivers and owns the screen.  (RIP Raul).  If you can look past Gillions extremely niche limited use inheritable attack he is actually a very strong DPS unit with incredible party comp versatility due to his class, alignment, and element combo.  His visual design is also one of the best Drecom has delivered in my opinion and dead on target for the Wizardry theme.

    For new players, or really anyone that has not cleared at least a "good ending" in Abyss 3 I am not sure I can tell you to pull for anything but the design.  In fact I wont, don't pull if this is you.  For players who have cleared a "good ending" of abyss 3, have access to all the games best farm spots, and have been playing longer and may have the inherit and party depth options... I think Gillion can be a truly be top tier DPS maybe even the best DPS fighter (as of 10/31/25 when this was written) and is worth seriously thinking about.  

    It is also worth saying it, from a Gacha Gear perspective this banner is just fire.  Every item is actually great, even the ring, and the armor and two hand sword are both the new "best in slot" in their respective gear catagories. A meta geared / inherited character can possibly reach 1000 atp with the sword.

## Duplicate Usage

* Inherit his skill to himself for increased damage on his heavy hitting single target spell
* Discipline for the usual small gains to stats
* Inherit to the MC if you want a relatively quick "kill me now so I can flame and reset" trigger
