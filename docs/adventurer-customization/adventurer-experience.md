# Adventurer Experience

## Experience Chart
<!-- div class="nosort-table" markdown -->

{{ pd_read_csv("data/exp-table.csv", dtype="str", header=[0,1], index_col=0).to_html(justify="center", na_rep="") }}


<!-- broken command without brackets. multi line at . for readability but doesnt matter if you 1-line it, still broke.

pd_read_csv("data/exp-table.csv", dtype="str", header=[0,1], index_col=0)
    .style.set_table_styles([{'selector': 'th', 'props': [('text-align', 'center')]}])
    .set_properties(**{'text-align': 'center'})
    .format(na_rep="")
    .to_html() 
-->  

<!-- /div -->

## Experience Gain Percentage

<div class = "nosort-table nofilter-table" markdown>

| Adventurer Lv - Enemy Lv | Effective Exp. Gain % |
|:------------------------:|:---------------------:|
|         -∞ ~ -10         |         150%          |
|         -9 ~ -5          |         125%          |
|              ±4          |         100%          |
|          5 ~ 9           |          50%          |
|         10 ~ 14          |          25%          |
|         15 ~ ∞           |         LOW%          |

</div>
