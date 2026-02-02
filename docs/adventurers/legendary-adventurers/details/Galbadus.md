---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Galbadus

# Note image files are all lowercase, and are expected as:
# name-class.jpg, name-altform.jpg, name-class-personal-request.jpg
#
# Free text can still be added to any section in the relevant text block but
# skill text still needs to be indented 8 spaces.
#
# Reviews can be added at end be removing comments around relevant sections
# in free text block.  To not remove any block tags.  

# set debug parameter to true to save full markdown before HTML build
# in a {project_dir}/debug_output folder (if that folder exists)
   debug_render: false  

---
  
{% extends "Adventurer_parent.md" %}   
     
{% block InheritFreetext %}
        !!! note "This attack is locked to close range, regardless of the weapon equipped."
{% endblock InheritFreetext %} 

{% block AltInheritFreetext %}
{% endblock AltInheritFreetext %}
     
{% block PotentialInheritFreetext %}
{% endblock PotentialInheritFreetext %}

{% block UniqueSkillFreetext %}
{% endblock UniqueSkillFreetext %}

{% block AltUniqueSkillFreetext %}
{% endblock AltUniqueSkillFreetext %}

{% block DisciplineFreetext %}
{% endblock DisciplineFreetext %}

{% block AltDisciplineFreetext %}
{% endblock AltDisciplineFreetext %}

{% block ReviewsAndAnalysis %}

## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    Galbadus is interesting, and my initial opinion of him is different than my "upon consideration" opinion of him, with his kit being simultaneously contradictory and synergistic. Let's jump in!

    First, Tyrant's Gravity is...probably a waste of a skill slot. The initial "taunt" (Attract-hit style) isn't bad, but it's limited by the fact that it only lasts 3 hits and is not guaranteed. Initial reports put it as "better than Attract Hit" but it's hard to measure how much. If you're fighting a single difficult enemy, this has the potential to last for 3 turns, but in other fights, it could be gone in half a turn, so keep that in mind. Not bad. Not great. Doesn't hurt anything. Hard to say if it'll really help much.

    Raging King is very interesting. This skills has a unique charge-up mechanic that actually changes the skill name per hit received in a turn from Raging Skill I through Raging Skill V and into Raging Skill Fury (6 total power levels) every time he gets attacked within a turn. The skill then resets itself on his next turn, whether or not he uses the skill. The key thing to note here is that in order to benefit from the charge up, he essentially needs to always be alternating turns with the enemies. If the turn order ever goes `enemies -> Galb -> Galb -> enemies`, the second Galb will not have any chance to get boosted damage. You could have some very interesting skill combinations here, particularly if you inherit Wild Strike to him. A scenario where you have the turn order shift from `Galb -> Enemies` to `Enemies -> Galb`, could result in extra charging for his attack. With Wild Strike being used to slow himself down, you could end up in a `Galb -> Enemies -> Enemies -> Galb` situation for additional chances to charge. Conversely, you really don't ever want to PORTO him unless you're okay with an additional turn of a no guaranteed charging.
    
    As far as damage goes, it's hard to measure the effectiveness of active skills, but initial testing shows an inherited Raging King I to be between Heavy Attack 2 and 3 - essentially inherited Raging King = Heavy Attack at the same SP level. When kept on him, it will be ~35-40% stronger, which is quite substantial.
    
    One other important thing to note is that Raging King is currently locked at melee (1 row ahead) range. It does not follow weapon range, so this largely rules Galb out as a back-row adventurer. Keep this range in mind if you are using him or inheriting his skill. We are not sure if this is intended behavior or not.


    The odd part about this is his base class of Knight, which makes you want to treat him as a defensive adventurer. Don't! That's not his role. Instead, treat him like a damage dealer as you would Shiou or Fighter Lana. On turn one, use any skill - it doesn't matter too much - it could be an inherited buff such as Warrior's Battle Cry (or even better, Lingering Blossom, if you have a spare Shiou) or it could be something from his own kit like Attract Hit or Knight's Defense. From turn 2 and on, just spam Raging King until things are dead or you have no more SP.

    A few additional things to keep in mind.
    
    - Depending on the fight you're in, it's very possible that Raging King will stay at I or II the entire fight. Some fights might let it climb up to Fury level, but the fewer collective hits coming his way, the less charging up he's able to do.
    - Similarly, if he's protected will, in a fight like Emergency Occurrence, you can expect to see his skill be charged up fairly high every turn, so expect high levels of damage when he's at risk of getting hit multiple times.
    - Knights typically don't have the greatest SP pools. This is somewhat offset by the lower skill cost, but something to keep in mind.
    
    For those that like Discipline, Bestial Roar is pretty solid - what's not to like about Attack Power and HP?

    In general, Galbadus is a fairly future-proof adventurer. The charge-up mechanic of his active skill isn't likely to be powercrept by future skills, and most future class options will enhance his combat abilities. Since you'd want to treat him as a damage dealer, his place in your party would be comparable to that of a Fighter or Samurai. Comparing him to Fighter Lana, he gains more personal damage but loses out on the end of battle heal and the row-level ~8% damage boost. Comparing him to Shiou, he gains more survivability and isn't quite as high risk. His damage level for the average player likely falls somewhere between the two, and it rivals and can potentially surpass Shiou if he's using a Cuisinart with the equipment available at the time of his release. Also, he looks pretty bad-ass.

    When deciding to pull, the biggest question you want to ask yourself is if you have room in your party for him. If you're already running a party consisting of Fighter Lana and Shiou, you probably don't need him. If you've missed out on Shiou, he could be an excellent high single target damage substitute.

??? info "Frobro's Analysis"

    What a cool-looking guy for such a straightforward game plan. Seems like a remix of Savia in a way; both are reliant on being targeted by enemies to do some of the highest damage any knight can output, but otherwise, they don’t stand out too much compared to other knights.

    His discipline focus of attack/HP is fine, but a solid step down from Savia’s weird double evasion focus. Raging King is cool, and it’s nice that he has a button to click that isn’t one of the easily inherited Heavy Attack equivalents, but you can get higher damage with fewer strings attached elsewhere. Also for some reason, they forgot to give it the “weaker when inherited” clause that every other legendary inherit gets. Tyrant’s gravity sounds strong until you remember that taunt skills are whack, and this is a taunt skill that can’t even be leveled up.

    This guy is in the wrong class on top of having a suboptimal alignment for being a front-row unit. Playing casually, he looks pretty neat, Dark resist is key when facing the Abyss 3 superbosses and when the stars align and you land that Raging Fury 6; I bet he feels like “that guy”, but outside of the vacuum, he’s just…suboptimal. Still strong though.

??? info "Karkarov's Analysis"

    So it is time to update this beast of an Analysis of some guys Gallbladder!  Galbadus, everyones favorite Dark Element Evil Beast Folk Knight not named Savia, has returned for a rerun, with a new alt class (Fighter), and right after the level cap has changed to 70!

    Sadly for Galbadus this is all bad news for him sort of.  Lets discuss why in this updated on 12/18/25 analysis.

    Fighter is the right alt class for him, but Fighter gained two new attack skills from 60-70 that are already more damage to sp efficient than his signature Raging King UNLESS he gets attacked multiple times before his turn.  And by multiple I mean like 3 or more times in one enemy turn.  Even then it will mostly be a close thing, if you level Raging King it can definitely bypass the damage of the new fighter skills at level 1, but will certainly be no where near as SP efficient.  Also Raging King got stealth nerfed and will no longer allow as many "stacks" of damage buff as it used to... whoops looks like Drecom noticed it was overtuned.

    All this means that Raging King is still a great skill on a Knight.... but on a Fighter who has learned the new 60-70 Fighter skills.... it is now ultra situational and probably no longer a good value proposition to level.  Unless of course your name is Moby Dick.

    Overall his biggest issue remains, he is evil alignment which means he breaks the Lana buff.  Now back row Fighter with a spear is better than ever, but as a Fighter/Knight Wombo Combo is he better than say Elise in the back row with the same class combo...  No, not really.  He doesn't suck, this class combo in the back row with a spear NEVER sucks.  He just isn't bringing anything that makes him clearly supperior to other characters with the same option that still work with the Alice buff.

    I won't lie, he is a strong character, his passive aggro draw on the first three hits is actually nice.  Raging King value has taken a very serious hit though, you kinda don't want him in the front row (yes Lana is that good) and he isn't really doing anything in the back row that others can't also do.  My original analysis was "not blown away, won't put him in some must pull list, but I see why people like him, and situationally he is really strong".  My analysis now is "Not blown away, his design is still cool as hell and one of the best Drecom has ever done, but he isn't really situationally much stronger than any other Knight/Fighter anymore."

    So yeah TLDR, Galbadus sadly is one of the characters that has not benefited from the 60-70 change through no fault of his own. Raging King simply lost value full stop.  He doesn't bring much to the Fighter big picture, and only really benefits noticeably from Raging King if you keep him Knight.  But who keeps a Knight / Fighter combo on Knight in this game outside of gimmick fights?

??? info "Shiro's Analysis"

    Starting with his inheritance. Oh boy… it’s one of the best ones in the game as for now. Especially if you run into harder fights where the enemy has multiple attacks per turn. As far as I tested his skill, it beasts damage options like FPS (for example Raging King can bring constant 4.5k DMG per turn on lvl 3 compared to FPS doing 8k only on much higher attack) or DTS as soon as you grab a few attacks in your direction. And this will also be his main selling point. It’s strong enough to a point where it’s worth inheriting it to other characters because even in the worst case scenario where the enemy doesn’t attack it’s as good as Heavy Attack at very least.

    Moving on his passive.. it’s good for auto farming when you run Morgus buff to make it more stable and lessen rng in fight… or take less rng in some fights with bosses in first turns (especially good if you want to have specific focus on single target bosses like 0C GWO) but outside it… it’s lacking. It’s only 3 attacks long.

    Moving to his discipline we don’t have anything special there. It’s focused on HP+ATK. It’s something but not much. Not worth the focus IMO (unless you rate 8 more ATK and 24 more HP on LVL 9 discipline that much).

    As for class change he doesn't have any as for now but I do hope he’ll get a fighter.

    To sum it up… when Galba arrived and I saw his kit I was honestly disappointed… he had great design but his kit felt lacking… that was until I pulled and used him. His active skill is completely absurd with how cheap the dmg tradeoff is. On top of it I thought that he’s bad because he's a knight not a fighter… but in practice it turned out that access to cover ability (especially passive like behind cover) allows him to stack his skill really easily making him the best knight with DPT potential next to Livana. Still… he needs a fighter for counter/follow up attack/Way of the Warrior/Immortal Strike/Wild Strike which will cover his kit even more. As for now I’m unsure whether it’s better to run him as a knight for easier stacking of his active skill or pray that he’ll get a fighter and run him as one. Either way Galbadus turned to be not only an amazing visually designed character but an all over solid damage dealing knight. With only downgrade being that his skill is always melee locked. Great addon to your team and completely worth running an evil team with him over bothering yourself with Lana buff.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"

    While his active skill seems fun and is potentially very powerful, I don't know that I'd necessarily have a place for him in my party, so I'm likely going to skip.

??? note "Karkarov's Pull Plan"

    I can't suggest you pull this character.

    Ironically my updated for Abyss 4 (12/18/25) pull plan still uses the same first line it did when Galbadus released.  Galbadus is a great Knight/Fighter for people who are hard core about theme teams like Beast Folk only or Evil only.  But outside that Gillion does 15% more damage than him all the time with no gimmick just 5% hp loss.  Lana gives her godly row buff and has an insanely better discipline.  Elise in the backrow buffs a nuetral and herself 10% damage plus is easier to D9.  Abenius gets that always there flutter dream, does not break the Lana buff, and if you use "Madam/Chadam" can get a strong damage synergy with him in the back.  Livana is still the muscle mommy, doesn't break Lana buff, and frankly especially in A4 with two hand changes.... Moonlit Axe Toss is a better skill than Raging King now.

    If you love his design and are one of those theme party people go for it, pull one copy.  As my analysis implied if your name is Moby Dick go for it, cause who cares in your case?  But seriously, if you are anyone else, seriously consider holding onto your gems a bit longer.  His inherit isn't even a big win for anyone anymore save someone like a El Dorado you are using for dark element super bosses.

## Duplicate Usage

- If you use him, there's really no reason to use dupes on anything other than his skill inherit. Boost that skill as much as you can, as it's very powerful.
- If you don't want to use him but want his skill on someone else, do the same thing. Get that skill level as high as you can - you'll probably want to inherit to level 3 at least in order to offset the damage loss from the inheritance
- If you're whaling, might as well throw some Discipline in, but only after you've maxed out the skill. If you're not whaling but pulled multiple copies, skip the Discipline and go for the skill inheritance

{% endblock ReviewsAndAnalysis %}

