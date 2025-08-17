# List of Skills per Class

[List of Skill Descriptions](./skills-and-spells.md)

=== "Fighter Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Fighter']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}

=== "Knight Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Knight']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}

=== "Thief Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Thief']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}

=== "Priest Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Priest']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}

=== "Mage Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Mage']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}

=== "Ninja Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Ninja']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}

=== "Samurai Skills"
    {{ populate_quicklist(file='skills.csv',return_columns=['Name','Type','Level'],filter_column='Class',filter_values=['Samurai']) | linkify_quicklist_skillnames | convert_to_md_table | add_indentation(spaces=4) }}
