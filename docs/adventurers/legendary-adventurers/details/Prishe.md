---
# Just change title to character's name, should match filename, and all data
# fields will pull from adventurers.csv, skills.csv, and image folder. 

   title: Prishe

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
    
    Out of the three collab adventurers, Prishe is definitely the least Fighter-like. While she does have the single target damage focus that Fighters do, Prishe's mechanic is focused on combo punching and has very little utility. Prishe alternates skills and basic attacks to ramp up a skillchain. Other punchy skills become available at higher skillchains, then using those skills decrease the skillchain value. This is a fun mechanic that is 100% focused on single target damage. Due to her unique and powerful combination of passives, the higher skillchain punches can deal tremendous damage and she can move very fast! The big caveat with all of the ramp-up skills is whether or not fights will last long enough for her to get full value out of the ramp.

    One important consideration with Prishe is that she gets a new weapon type that is exclusive to her. Historically, exclusive weapon types have been a bit of a pain to deal with in this game, so if you want to use her, make sure you try to get something good from the event!

    Another important note is that her inheritable skill becomes utter garbage when inherited to someone that's not her, so just don't do it!

    She also has a single target heal that can target an enemy. Neat, I guess?

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'll likely be pulling on the collab - not sure how much yet, and not sure how much I'll use any of the adventurers, but Prishe at least seems fun to play with!

{% endblock ReviewsAndAnalysis %}
