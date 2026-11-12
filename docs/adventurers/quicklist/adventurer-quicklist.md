# List of Adventurers

=== "Basics"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Race','Gender','Primary Class','Secondary Class','Type','Personality','Alternate Style','Rarity']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Base Traits"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Strength','IQ','Piety','Vitality','Dexterity','Speed','Luck']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Base Traits (2nd Class)"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Strength2','IQ2','Piety2','Vitality2','Dexterity2','Speed2','Luck2']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Skill Inherits" 
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Rarity','Inheritable Skill','Alternate Inheritable Skill','Potential Inherit']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Remains"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Rarity','Unique Bone Name','Alternate Unique Bone Name','Alternate Unique Bone Name2']) | rename_columns(['Name','Rarity','Unique Bone Name','1st Alternate Unique Bone Name','2nd Alternate Unique Bone Name']) | convert_to_md_table | add_indentation(spaces=4) }}

=== "Release Date"
    {{ populate_quicklist(file='adventurers.csv',return_columns=['Name','Rarity','Original Release Date','Alternate Release Date','Alternate Release Date2']) | rename_columns(['Name','Rarity','Original Release Date','1st Alternate Release Date','2nd Alternate Release Date']) | convert_to_md_table | add_indentation(spaces=4) }}
