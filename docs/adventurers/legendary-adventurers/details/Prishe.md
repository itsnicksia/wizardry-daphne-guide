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
    
    All three of the collab reviews here will be fairly similar and pretty succinct - all of the new adventurers are effectively Fighters with unique mechanics. Prishe's mechanic is focused on combo punching and has very little utility. Prishe alternates skills to ramp up a skillchain. Other punchy skills become available at higher skillchains, then using those skills decrease the skillchain value. Ultimately, this is a fun mechanic that is 100% focused on single target damage. The big caveat with all of the ramp-up skills is whether or not fights will last long enough for her to get full value out of the ramp-up. To help facilitate the ramp-up, Prishe's kit has some passives that lead to increases in ASPD, allowing you to play with speed tuning mechanics more easily to get her to start lapping enemies.

    One important consideration with Prishe is that she gets a new weapon type that is exclusive to her. Historically, exclusive weapon types have been a bit of a pain to deal with in this game, so if you want to use her, make sure you try to get something good from the event!

    Another important note is that her inheritable skill becomes utter garbage when inherited to someone that's not her, so just don't do it!

    She also has a single target heal that can target an enemy. Neat, I guess?

## Adventurer Pull Plans

??? note "TheAxolotl's Pull Plan"
    
    I'll likely be pulling on the collab - not sure how much yet, and not sure how much I'll use any of the adventurers, but Prishe at least seems fun to play with!

{% endblock ReviewsAndAnalysis %}
