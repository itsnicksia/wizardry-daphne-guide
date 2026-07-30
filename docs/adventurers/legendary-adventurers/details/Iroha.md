---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Iroha

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
    
    All three of the collab reviews here will be fairly similar and pretty succinct - all of the new adventurers are effectively Fighters with unique mechanics. Iroha's mechanic is effectively a repeatable version of Yoizou's ramp, which is...interesting. The first and fourth steps of the ramp are single target physical fire, with the second being row physical fire and the third being row magic light, yet still based on attack power. This gives her a unique niche of being able to deal multiple element types of damage, as well as both physical and magical damage, all with the same skill. Unfortunately, early indication points to the typical Fighter approach of alternating Poised and ESS being roughly comparable in damage to her ramp, and potentially surpassing it unless you're capitalizing on the Fire/Light damage elements.

    Iroha also has a cheat death mechanic that could occasionally be nice, but probably won't see much practical value.

    Like Prishe, her inheritable skill becomes utter garbage when inherited to someone that's not her, so just don't do it!

    She, like Prishe, has a heal, but hers is a row heal that also gives a resistance boost, which is...something.

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'll likely be pulling on the collab - not sure how much yet, and not sure how much I'll use any of the adventurers. Like Prishe, Iroha seems like she could be fun to play with!

{% endblock ReviewsAndAnalysis %}
