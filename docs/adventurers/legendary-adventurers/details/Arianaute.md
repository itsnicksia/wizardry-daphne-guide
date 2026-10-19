---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Arianaute

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

<!-- any Character Reviews and pull plans go down here. Just uncomment sections -->

## Adventurer Reviews

??? info "TheAxolotl's Analysis"

    Do you like Knights? Do you think the best defense is a good defense, offense be damned? If so, Arianaute might be for you!

    Her active skill, Luminous Bastion, is effectively a row-based Knight's Defense. It's cheaper than KD and the damage taken reduction it applies is massive, but you need to be able to predict where the damage is coming.

    Her inheritable skill, Saint Guard, is an interesting passive. It provides a chance (rate still to be determined, but maybe 70-80% chance on her for the initial trigger) of defending when being attacked. If it's on her or inherited to another Knight, there's an additional chance of effectively triggering a Line Cover that can also enable an Opening. It's important to note that if it's inherited to someone that is not a Knight, that adventurer cannot enable an Opening when the skill triggers.

    There are some nuances here. This skill can trigger multiple times in a battle, but after each trigger, the chance to trigger again is reduced. This does lead to reduced effectiveness over longer fights. It's also important to note that it can trigger if an attack gets evaded, which results in a wasted trigger. If inherited to a Samurai, it will not cancel the Samurai's current stance when it triggers, which is good.

    Her Discipline gives HP and SP, which are both solid for Knights. The SP in particular is very welcome due to how low the Knight SP pool is.

    One other important thing to note that isn't Arianaute-specific is a change in behavior for Knight's Defense. KD used to expire when the protected adventurer's turn passed, but now it expires when the Knight's turn passes. This means in general that you now want your Knights to go pretty slow, and if you have adventurers that start to lap your Knight, that effectively increases the efficiency of KD since it leads to more turns of protection for a given adventurer without increasing the Knight's SP usage.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'm a bit undecided here. In general, I think the best defense is a good offense, but there are times when such a strong wall could be valuable. I might pull some for occasional use or for some inherits, but I'm not sure yet.

{% endblock ReviewsAndAnalysis %}
