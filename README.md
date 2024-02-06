# Soup Language

This is a simple language based on piecewise relations.

## TODO

- [x] Grammar
  - [ ] tests
- [x] SoupReader
- [x] Syntax Tree Model
  - [ ] define structural equality with a visitor instead inline
- [x] Map the Antlr4 tree to the Syntax Model
  - [x] Add position information from ANTLR4
  - [x] tests for Antlr4 to Syntax Model
- [x] Linker, to link the references in the tree
- [x] Expression semantics, visitor expression -> value
  - [ ] tests
  - [ ] add runtime type checks
- [x] Statement semantics
  - [ ] tests
- [x] Soup semantics
  - [ ] tests
- [x] Add step evaluation
  - [x] primed reference `IDENTIFIER'`
  - [x] NamedPieceReference `p:IDENTIFIER`
  - [x] Enabled `enabled expression`

## Missing things

This is just a simple Soup, some things are missing, and that is normal.

- variable definition in the piece scope (Local To Transition)
- multiple initial states
- non-deterministic assignment
- synchronizations: 2-channels, n-m channels, clocks
- priority amongst pieces
- time, a la DBM
- structures and union, to get sum-of-product user-defined datatypes
- pattern matching
- macros or VHDL-like generate statements. Can use M4 for this.
- functions
- modules
- dynamic instantiation
- ...
