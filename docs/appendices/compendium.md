# Compendium

<small>Note that special, limited time, and gacha equipment is often numbered as "Ex." making it harder to identify missing items. [Contributions of missing items welcome. (Screenshots preferred.)]((../index.md#contributing))</small>

=== "Characters"  

    === "All"  

        {{ populate_quicklist(file='compendium.csv',filter_column='Category',filter_values=['Characters'],return_columns=['Number','Name']) | convert_to_md_table | add_indentation(spaces=8) }}

    === "Key Characters"  

        {{ pd_read_csv("data/compendium.csv", dtype="str").query('Category == Characters & Subcategory == KeyCharacters')[['Number','Name']] | convert_to_md_table | add_indentation(spaces=8) }}
        
    === "Other"  

    === "Allies"  

=== "Item"  
    
    === "All"  

    === "Sell Only"  

    === "Consumables"  

    === "Valuables"  

    === "Other"  

=== "Equipment"  
     
    === "All"  

    === "Weapons"  

    === "Shields"  

    === "Head"  

    === "Body"  

    === "Hands"  

    === "Feet"  

    === "Accessories"  

=== "Monsters"  

    === "All"  

    === "Monsters"  

    === "Key Monsters"  
    
