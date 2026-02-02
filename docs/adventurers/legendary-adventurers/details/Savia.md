---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Savia

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

    Savia gets a nice boost due to the change to Alice's Blessing of Agora skill and the availability of Way of the Warrior through a skill inherit, but I'll touch on that in a bit.

    To dig into her skills, Black Beast Feint is a very interesting mechanic. It's an evasion self-buff that also acts as a "taunt" with a counterattack. Like Attract Hit and Defensive Provoke, this is not a guarantee that she gets attacked if a single target physical attack would be used. It's possible that it has a higher chance that the aforementioned skills, but that's hard to confirm. It's still nice even though it's not a guarantee, but  unfortunately there are two other main limitations.

    First, this is a skill and is not treated as a basic attack, which means it is going to be subject to the logarithmic nature of active skill damage and cannot trigger Follow-Up Attack. Second, it will only work for single target, physical attacks. It will not protect at all against `MA` or `LA` level attacks, and it will not protect at all against spells.

    By default, the "taunt" portion of Black Beast Feint lasts for 2 turns (the turn you cast it and the following turn), while the counterattack portion lasts for one turn.  If you combine Black Beast Feint and Blessing of Agora, however, both see a single turn increase, leading the "taunt" to last for 3 turns and the counterattack to last for two. This puts Savia in a very unique position of being able to use Black Beast Feint on the first turn, then defend on the second turn. Her Defending will activate the Opening status, while her counterattack will cause Opening damage from her skill. This combination makes her extremely potent for dealing with heavy single target attackers like Cyclopses, as well as groups of single target attackers like Chimera.

    An added benefit is that this skill can act as a one point wonder inherit for any adventurer you want to put in the position of being an Opening activator, as there is no reduction in counterattack chance when inherited to someone other than Savia.

    Her Soaring Beast Knight skill likely is similar to Wandering Lana's skill in that the buff is relatively minor at just a few points, and only considers the weapon slot and the chest armor slot.

    Her Discipline skill is a decent defensive boost, but not having any extra offensive boost is less than ideal.

    Overall, she's received quite a bit of indirect love since she was released, and she's certainly more viable now. Her longevity will depend quite a bit on how many future encounters rely on single target physical attacks and how many incorporate regular spell damage and MA/LA targeting physical attacks. In addition, she's still a Knight and will be fairly SP-starved.

??? info "Frobro's Analysis"

    What a sick-looking unit, right? Is she a cat; a wolf…who knows? Well, that’s almost it for the pros, now to the cons. Knight isn’t in a great place as I write this. Their 1 claim to fame is Knight’s Defence and she’s not much better at using that than any other knight aside from having a deeper SP pool. Thief for a secondary class gives her surety/evasion-related passives, and precision strike, which are useful.

    Black Beast Feint is like a better Defensive Provoke. Better in that the evasion buff it grants is better than a defense buff, and the counter-hit has def-penetration, which along with the 2-hand weapon buff means this can do solid damage. Unfortunately, it's still kinda whack because the aggro effect doesn’t feel particularly potent and a good chunk of named enemy attacks can’t be countered at all.

    The Soaring Beast Knight passive isn’t so bad now that 2-handed weapons like Spears are in style! Her discipline focus is interesting; that “greatly” increased evasion is no joke; I forget the exact numbers, but it’s something absurd at the high end. It’s like she has a double evasion discipline.

    This chick is an easy skip unless you need a Dark Knight for Abyss 3 superbosses and even then, there are options like Galbadus, Red Beard, Gerard and Eldorado. As a backrow Evil Knight, she’ll still be able to put up numbers while getting Dark/Evil synergies from units like Alice, Rinne, Red Beard, Arboris and Milana.

??? info "Shiro's Analysis"

    Starting with inheritance. It’s really a good hard hitting counter. Working well with Savia access to 2h weapons (especially spear or bow) and while a bit of rng based because of how taunt works still does it’s job thanks to cover abilities. On top of that it boosts her evasion, letting her be an even better evasive knight. I personally don’t know if I would give her inheritance to anyone else. Maybe Debra. But it’s worth considering to lvl it on Savia.

    Moving to her passive while not highly impactful pushes her further towards being an evasion tank. It works well with spear and Le Bicken armor letting her to get decent evasion just with those 2 alone.

    Moving to her discipline I personally love it because of how strong the evasion number is and how I do love to use evasion units. It allows her to hit really high and absurd evasion values, besting thieves as a knight.

    Her class change is a thief which is amazing for her. Not only does it further boost her performance as evasion knight is also buffed her damage thanks to surety accessibility. On top of that she gets PS from the thief for the single target damage option. You might as well use her as a thief with a bow but that’s not the best way to use her IMO. Though she still performs as a better counter thief than one other character without access to taunt (Yes Aldric. I’m looking at you).

    To sum it up. Savia's best performance will be knight with a mix of her counter+cover abilities. She had shown to be able to hit quite hard even against some bosses with DEF up.  Even better if we are facing physical bosses with multiple attacks (like Elmon second cave). Sadly to perform well she needs lvl 1 Alice inherit and preferably lvl 5 to put the best use of her rotations. On top of that, a good bunch of bosses seem to use magic attacks. So unless Savia counters won’t get some kind of rework she’s just a regular knight on those. But thanks to being a dark element she’s never a bad option in your team.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Savia was a pass for me on release. The broken kit didn't help things, but her signature skill, while occasionally powerful, was a bit too situational for my tastes. If I were to run her, most of the time I would probably end up using a skill other than her signature, and that's not enough incentive for me to want to pull on her.

    I've contemplated giving her a chance when her banner reruns, but I'm not sure yet. To me, Savia looks cool, but that's really it. While her skill is unique, she doesn't bring anything universally strong to the party.

??? note "Lynd's Pull Plan"
    I pulled for collection because she looked cool but tbh honest, she worked pretty well in the backline enough for me to bring her in occasionally so maybe I should've thrown a couple more for discipline.
    
## Duplicate Usage

* Inherit to MC if you want him to abuse the Opening strategy
* Inherit to Savia if you want to increase her counterattack damage
* Discipline if you want to boost her evasion

{% endblock ReviewsAndAnalysis %}
