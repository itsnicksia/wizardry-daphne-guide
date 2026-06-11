---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Kagero

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

    === "Standard"

        Kagero, our newest ninja, has an interesting and fun kit!

        First, Nine-Seal Slash: Concealment is a forced single hit attack that gives an evasion buff. The forced single hit means it should really only be used with a ninjato, so no dual daggers for him. Due to the new ninjato passive, this buff will act as both a defensive and an offensive buff, allowing for gradually-ramping damage and survivability. The damage itself will be higher than Armor Pierce when used by Kagero, but if inherited, will end up as fairly comparable to AP and lower than other options, such as DTS, Mirage Hunting, or Luring Fang. In general, while he can potentially just repeatedly use Nine-Seal, other ninjas will likely want to switch to something else after getting 5 evasion stacks.

        His passive, Return from the Six Realms, is a bit of an inverted but ramped up Flutterdream Flash. It stacks up to 50 and appears to gain 2 stacks per enemy action. It also seems to gain 2 stacks per poison tick, but we're not sure of what other triggers there are yet. When it reaches the maximum 50, he'll attack a random target. Similarly, these stacks also contribute to his ability to cheat death once and counter with the attack. While this attack does deal "major" damage, the ramp-up is variable and on short fights, will likely never fire off.

        His discipline boosts Attack and Evasion, which is fairly solid for his kit if you're into that.

        All in all, I really like the Nine-Seal mechanic, and Return from the Six Realms seems fun, but probably not practical in most fights. The biggest thing to consider is that he's Evil and needs to be in the front row, which makes him harder to slip into the average player's party, particularly if they're running a Lana-centric Good/Neutral front row. If you do run an Evil/Neutral front row, he's a solid addition. Nine-Seal opens up some interesting ninja evasion taking combinations, particularly if you combine it with an inherited Luring Fang to help draw that enemy attention. 

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    I'll likely pull a copy to give to Rinne for the evasion buff. I might pull a second copy to give to Shiou for funzies, but undecided now.

{% endblock ReviewsAndAnalysis %}