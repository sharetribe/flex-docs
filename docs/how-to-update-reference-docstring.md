# How to update transaction process action reference

The transaction process action reference in
`src/docs/references/transaction-process-actions/index.md` is updated
from the
[sharetribe-custom](https://github.com/sharetribe/sharetribe-custom/tree/master)
repository's transaction process action documentation. To make the
update, you need to run the following commands in that repository.

1. Run the command `clj -A:dev:test:build` to start a REPL against the
   repository.

2. Copy the contents of the
   [action_doc.clj file](https://github.com/sharetribe/sharetribe-custom/blob/master/dev/action_doc.clj)
   and paste them in the REPL.

3. Run one of the following commands.

```clj
  ;;Run the following, and copy the output from terminal to Docs site.
  (println (extract-section-docs action-nss))

  ;; OR
  ;; Run the following, and copy the output from action-doc.md file to Docs site.
  (spit "action-doc.md" (extract-section-docs action-nss))
```

4. Copy the output and paste it in
   `src/docs/references/transaction-process-actions/index.md`. Double
   check the diff to see the changes being made, and format accordingly
   where necessary.
