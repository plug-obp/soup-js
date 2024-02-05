# Soup Language

This is a simple language based on piecewise relations.

## TODO

- [x] Grammar
- [ ] Test Grammar
- [x] SoupReader
- [x] Syntax Tree Model
- [x] Map the Antlr4 tree to the Syntax Model
- [x] Test Antlr4 to Syntax Model
- [ ] Linker, to link the references in the tree
- [x] Expression semantics, visitor expression -> value
  - [ ] add tests
  - [ ] add runtime type checks
- [x] Statement semantics
- [x] Soup semantics
- [x] Add step evaluation
  - [x] primed reference `IDENTIFIER'`
  - [x] NamedPieceReference `p:IDENTIFIER`
  - [x] Enabled `enabled expression`
