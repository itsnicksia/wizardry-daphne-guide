---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Red Beard

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

    Red Beard has an interesting and somewhat contradictory skill set that make him simultaneously unique and difficult to optimally use.

    First, in his favor, is his Neutral personality. This lets him fit well in the front row with Lana or in the back row with Alice and not mess up their row buffs.

    His Apostle of Breaking Commandments skill provides some nice resistances for himself and any adjacent dark allies. The weird thing about this is that as a priest, he's usually going to be in the back row, which can force you to decide between placing him in the middle to allow him to buff three dark allies, which prevents you from placing a mage in the middle to leverage their secret art. If you place him on an edge, he can only buff two allies. You can also place him in the front row, but the limitation there is that Priests have limited equipment options compared to other physical damage dealers and they have a reduced Strength to Attack Power modifier, which means he'll have overall lower attack and not be able to take full advantage of his own unique spell.

    His Prayer of Rebellion spell, in a vacuum, is very powerful since it provides both a powerful offensive buff and a conditionally useful defensive buff for three turns. As a row-wide attack power boost that can be targeted, it allows you to cast this on your front line in turn 1 and have that line start attacking on turn 1 with boosted attack power. No need to spend a turn casting Warrior's Battle Cry first.
    
    In practice, though, there are a few major limitations with it that make it less appealing. The first is that you can only apply three buffs at a time. You'll likely want to be using MACALDIA, which already takes up two slots, so the order you apply the two buffs is crucial. I haven't confirmed this myself, but apparently the Resistance buff ends up ahead of the Attack buff on the list, so if you want to keep the Attack Power, Accuracy, and Surety buffs from the combination of MACALDIA and Prayer of Rebellion, you MUST cast Prayer of Rebellion first, that way MACALDIA will knock the Resistance buff off the list. If Red Beard is your only buffer, this isn't really an issue however if you're using two buffers, you'll need to pay close attention to speed tuning so Red Beard always goes first, assuming you want to apply both buffs on the same turn.

    The magnitude of the Attack Power boost from Prayer of Rebellion seems to be comparable to, if not a bit lower than that of Warrior's Battle Cry at the same skill level, with Warrior's Battle Cry significantly easier to get a higher skill level of through inheritance. It is possible to stack Warrior's Battle Cry with Prayer of Rebellion, which can be great if you don't need the Surety or Accuracy from MACALDIA, but most people are probably not in that situation, so MACALDIA would likely still be more valuable to them.

    If inherited to a different adventurer, Prayer of Rebellion will see a reduction in magnitude of the buff as well as a 1 turn count reduction. This turn count reduction is less than ideal since that can mess with your buff rotation and force you to delay reapplying it if you don't want to knock an important buff off the list. If inherited to Alice or someone with her skill, the two will offset each other at level 1, resulting in the buff lasting 3 turns while other buffs would last 4 turns.

    He's a solid pass for me, personally. I think his buff, while nice, is limited from its full potential by core game mechanics and he won't provide anything overly unique to my party that can't already be achieved, with potentially better and easier-to-work-with results, with other party members like Alice.

??? info "Frobro's Analysis"

    I like the idea of something unorthodox, but it just isn’t as effective here. Red Beard is kind of a front-line back-up priest. Male/Dwarf + that Divine Power and Attack discipline point to him being a strong attacker, but when stuck with the weapon restrictions Priests have, he kinda has to be in the front. Fortunately, as a neutral unit, he doesn’t break one of the few well-aligned front-row buffs.

    He has relatively low MP for a priest and low SP compared to other physically inclined units, meaning you can’t rely on him being your only healing source in extended runs and he doesn’t have the resources to use high-level inherited skills like Heavy Attack to make up for priest’s lack of offense phys damage.

    The Prayer of Rebellion buff sounds cool, but in reality, it is okay at best. Attack buff feels unimpactful and it takes up 2 buff slots with the Res add-on. Macaldia is preferable unironically. The Dark Adjacent Instakill + Omnibind resist is cool, but not enough to make him an appealing bring.

    Priests are better in the back with tons of MP, and the front line is reserved for units that can put up big physical damage and Red is neither of those. Wouldn’t suggest using unless you’re dead set on having a mono-dwarf team. Getting Knight as an alt class gave him a real job as a Knight’s Defense/Prayer of Rebellion Spammer and back status cleanser.

??? info "Shiro's Analysis"

    Starting with inheritance we have access to one of the best buffs in the game for bossing purposes only. Both ATK and res up are there to make it easier to build up immunity with gear or disciplines that have resistance to these statues while allowing you to ignore them in your gear completely. Outside of bosses who use statuses, his inheritance loses value because of the 3 buff limit.

    His passive is solid. Works well with Sheli or Miliana. But it’s not appealing enough in my eyes to think about bringing him to a team for that purpose.

    His discipline pushed DIV and ATK which confused everyone to a point where devs themselves named his class to change a fighter in a game as a bug. But he ended up as a knight. Which is better of him but kind of stings that it went in this direction instead of lore accuracy.

    His class change is knight which just settled him as “best” niche pick. I wouldn’t use him generally but if someone likes to min max their fights then here he is. Good option vs Sealed Demon or Morgus.

    To sum it up. Red Beard's purpose is to be a backlane knight who uses his buff for the team and then he sits on knight defense. Basically build on dark super bosses. When it comes to this no one beats him. But… It's a niche. And I feel that most of the community won’t even attempt superbosses. And those who do have probably enough of an investment in other picks. So in the end he’s best at doing something really specific. And that’s the only thing he does well. In my personal opinion he’s either skip or inheritance for Alice. But I won’t call him weak.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    Red Beard was a skip for me. His buff is strong, but I didn't want to have to fight the 3 buff limit and buying Scrolls of Shared Power from the shop could cover any same-turn attack power buffing I wanted.

??? note "Lynd's Pull Plan"
    Now I have nothing against dwarves, I was a Gerulf truther and still use him ocassionally to this day. Redbeard though? One copy for collection because Alice looks better in my backline.

## Duplicate Usage

* Inherit on his own skill will increase the magnitude of his buff. If you're using him in your party, this should absolutely be your top priority.
* Inherit his skill to other adventurers for a less effective version of the buff.
* Increase his Discipline level.
* Save to inherit to future adventurers.

{% endblock ReviewsAndAnalysis %}

