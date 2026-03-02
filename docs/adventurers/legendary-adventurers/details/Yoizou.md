---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Yoizou

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

    It's time for our second legendary Samurai to come around, and while he's also released with a new weapon type, I'm not going to touch on that here. This is simply going to look at his kit. All in all, he's...fine. He excels in a niche that isn't really needed, and if you're comparing him to Shiou, I'd argue that Shiou has more universal use and appeal, but let's dig in!

    First, we'll talk about his inheritable skill, Blazing Resplendence. While I don't have the numbers for this skill, it's a combination buff, debuff, and attack all in one. It buffs your fire damage dealt, increases your water damage taken, and then attacks with a Moderate attack. Not a bad one point inherit for a fight that needs fire damage, but...those really don't exist. When inherited, it seems to be ballpark a 20% fire type boost, while on Yoizou himself, it's around 25% or so. Not horrible, but the bigger problem is that there just aren't any situations where you'd need that fire damage boost to begin with.

    Moving on to the more interesting skill, let's talk about his Running Flame line. This skill, like Shiou's Ephemeral Illusion Stance, is his nuke, and at a glance, it's pretty neat. You use the skill to deal Moderate damage to a row, and then skill changes to Running Blaze. You use Running Blaze to deal Major damage to a row, then it changes to Running Inferno. Finally, you use Running Inferno to deal Massive damage to a row, then his ASPD and Evasion get debuffed. Each of these skills can be used once in a fight and they don't need to be used sequentially.

    Here's where things start to break down a bit. First, you need to use Flame-Bearer to even be able to start with Running Flame. That means a total of at least 4 turns must be taken before you're dealing Massive row damage, and at least 5 turns total if you want to use Blazing Resplendence first. If you die at any point after starting the Running Flame sequence, you'll need to spend a turn to re-cast Flame-Bearer. By the time you're able to deal that massive damage, most things that need row-level damage will be dead, so you automatically lose some value there. Also, if you happen to get to the end of the Running line and deal that Massive damage, you're going to be debuffed for 3 turns right after.

    Since you don't have to use the Running line in consecutive turns, you could save those ramped up attacks for specific turns in fights where a strong enemy might periodically summon other enemies, but it's still a decent amount of ramp up to maximize value, and your party likely has better, more efficient ways of dealing with those enemies.

    His Discipline skill, Flame of Revolt, is Magic Power and Magic Defense, which is fine.

    I will say that I do actually like the approach the devs are taking with Samurai. Giving each legendary Samurai a unique nuke is a fun way to keep mechanics interesting, and in a vacuum, I don't mind the ramp-up nature of his skill. The bigger issue is that there's just not enough content around right now where you'd get the full value out of his attacks, and there's very little incentive to use him over Shiou. All in all, he's an okay adventurer that feels relatively skippable to me. 

??? info "Karkarov's Analysis"

    It's yo boi Yoizou, and boy am I late on this analysis.  That said better late than never, so lets get into it.

    Yoizou is a samurai elf fire element dude.  Already the problems are showing.  First off as an elf he clearly favors IQ, which is fine for Samurai especially with Yoto as an option.  However he is male and fire element which favor Str, so there is low synergy on his base character traits.  Not huge, but it doesn't help.  Also elf means lower Str and Vit, but better IQ, Dex, and Spd.  So you know, thats actually totally fine and balances out, it is even kinda good.  Though it also means lower HP and SP growth in favor of better MP growth... on Samurai... one of the squishiest classes in the game already due to Cresting Wave being all but required to start their DPS rotation... and don't Samurai mostly use SP?  This is not so good.  His discipline also is +magic power and +magic defense... nice for elf, not so special for Samurai, still no synergy with male fire element.

    At this point my opinion on Samurai is very solifified, I dont like them.  They are extremely gimmick based and only excel in fights where the enemy only attacks once, can only do physical attacks, and you can practically guarantee the attack will go at the Samurai.  Otherwise they are "roll those dice baby" go for bamboo spam and pray no one actually attacks them as they are carrying a +25% damage taken debuff from cresting wave.  Nothing in Yoizou's kit does anything to address this base problem with Samurai.  His inherit skill Blazing Resplendance will not out perform Bamboo Splitter by damage, increases fire damage dealt to enemies, but increases the damage he takes from water attacks.  So generally speaking Bamboo is better for damage (shock), it is only situationally better than Bamboo in fights where enemies never use water attacks (aka not abyss 4) and are weak to fire (most of abyss 4 but see water weakness).  This skill really is gimmicky synergizing on the idea you are running a fire element team.  PS Fire element teams are only meta in the Den of Wind.  Do you actually have trouble clearing the Den of Wind?  Do you even visit the Den of Wind?

    What about his non inheritable skill?  
    
    That would be Running Flame.... and this is where I get upset about this character and begin to question if Drecom character designers even have the tiniest iota of a clue on how to design anymore.  Running flame is effectively a fire element line aoe that does good damage, and each turn you use it becomes a stronger version of the same skill until it has been used 3 times.  It is truthfully a really solid strong line aoe attack, possibly one of the best in the game.  Maybe the best, especially if the fight lasts long enough and needs AOE all the way through.  Situational yes, but it's there.  
    
    So why is it upsetting?  Because to use the skill and to start building it to higher levels where the damage gets serious you have to cast Flame Bearer first.  You know... Flame Bearer, the skill that puts fire element on your weapon, gives you extra damage if the enemy is weak to fire, and is Samurai only?  So you have to spend a round just to even use this aoe at all, the round is basically wasted because it is a fire element attack from the get go meaning flame bearer doesn't actually do anything other than give a slight damage buff if the enemy also happens to be weak to fire, and the real kicker...  Even though his AOE skills are not Samurai or Katana specific... Flame Bearer which you had to use to do his aoe at all is Samurai and Katana Specific.  Meaning when Yoizou gets a class change he immediately loses the best thing about him as a character, his build up aoe attack.  They could have given this guy a Mage or Priest class change, or Knight or Fighter.  If the aoe had stayed in place it would have been a great value add and worked well in so many situations and been useful on any number of classes.

    But no lets make it Samurai only like every other Samurai skill and bake in a 1 round delay to even start using it so it is immediately a dog water trash tier of a skill.

    Drecom was cooking with this one.  Cooking themselves.  Yoizou has no synergy as a character, is even less survivable than other Samurai because of elf, and his best aspect is gone the second he changes class and even needs to burn a round (lol puns) to even use it.  Plus Samurai already brings almost nothing to class swaps to begin with.  He is not a good character, you shouldn't build him.  That's it.
    
    If you love Samurai Shiou continues to be the best choice (as of 2/21/26) if for no other reason than her SP, Spd, and Dex growths.  Also the fact that her inherit is situationally useful more often than any other legendary Samurai's inherit skill giving her surviveability they don't have, and her alt class is Fighter.  
    
## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    If I get him with free bones, I might do something with him, otherwise I'm saving.

    
??? note "Karkarov's Pull Plan"
    
    From a character design perspective he is the coolest Samurai in the game in my opinion.  If you love this design and just have to have it, pull.  If you are anyone else do not pull.  I don't even care if you are a whale, he isn't worth it, save your gems and money.  Just pass.
  
 
## Duplicate Usage

* Inherit to himself to increase the skill's effectiveness
* Inherit to someone else for situational fire damage boosting
* Discipline will increase his damage a bit. Keep in mind, though, that Samurai only have a ~0.65 multiplier on their Magic Power contribution to effective Attack Power, so the actual damage contribution from a Magic Power Discipline would be less than the contribution to a Mage.
{% endblock ReviewsAndAnalysis %}
