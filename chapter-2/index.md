---
marp: true
theme: gaia
paginate: false
math: katex
---

<style
  type="text/css">
section.lead.large h1 {
  font-size: 200%
}
/* section.answer > * {
  display: none
} */
</style>

# Binary number system

---

# Set Theory

---

## Complement Range

---

# Binary Search Tree

```sql
CREATE FUNCTION cidr_get_complement(p_nodes cidr[], p_original_nodes cidr[]) RETURNS SETOF cidr
  IMMUTABLE
  PARALLEL SAFE
  LANGUAGE plpgsql
AS
$$
  BEGIN
    RAISE NOTICE '%, %', cardinality(p_nodes), p_nodes;
    IF cardinality(p_nodes) = 0 then
      RAISE NOTICE '%, %', cardinality(p_nodes), 'END!!';
      return query select * from (values (null::cidr)) t where FALSE;
    else
      return query with nodes as (
        SELECT n.n as node from unnest(p_nodes) n
      )
      , original_nodes as (
        select n.n as node from unnest(p_original_nodes) n
      )
      , siblings as (
        select DISTINCT cidr_get_sibling(nodes.node) as sibling
        from nodes
        where not exists(select * from nodes n where cidr_get_sibling(nodes.node) >>= n.node)
      )
      , parents as (
        select DISTINCT case when masklen(nodes.node) > 0 then set_masklen(nodes.node, masklen(nodes.node) - 1) end as parent from nodes
      )
      SELECT siblings.sibling as node
      from siblings
      where siblings.sibling is not null
        and not exists(select * from nodes where siblings.sibling >>= nodes.node)
        and not exists(select * from original_nodes where siblings.sibling >>= original_nodes.node)
      union
      select * from cidr_get_complement(array(select parents.parent from parents where parents.parent is not null), p_original_nodes)
      ;
    END IF;
  END;
$$;
```

---