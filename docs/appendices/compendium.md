# Compendium  
<small>Note that special, limited time, and gacha equipment is often numbered as "Ex." making it harder to identify missing items. [Contributions of missing items welcome. (Screenshots preferred.)](../index.md#contributing)</small>  
=== "Characters"  

    === "All"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Key Characters"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters" & Subcategory == "Key Characters"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Other"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters" & Subcategory == "Other"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Allies"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Characters" & Subcategory == "Allies"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

=== "Item"  
    
    === "All"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

    === "Sell Only"  
        {{ pd_read_csv("data/compendium.csv", dtype="str", header=0)
        .query('Category == "Item" & Subcategory == "Sell Only"')[['Number', 'Name']]
        | convert_to_md_table(colalign=["center","left"]) 
        | add_indentation(spaces=8) }}

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
    
