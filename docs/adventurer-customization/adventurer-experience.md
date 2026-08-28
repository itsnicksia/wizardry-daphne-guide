# Adventurer Experience

## Experience Chart

<div class="nosort-table nofilter-table" markdown>

{{ pd_read_csv("data/exp-table.csv", dtype="str", header=[0,1], index_col=0)
    .to_html( na_rep="", border=0)
    .replace(' class="dataframe"', '')
    .replace('<th>', '<th style="text-align: center;">')
    .replace('<th colspan', '<th style="text-align: center;" colspan')
    .replace('<td>', '<td style="text-align: center;">')
    }}

</div>

** Note: All unique classes follow the Basic Class experience progression except for Samurai of the Black Rod, who follows the Samurai progression.

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
