---
title: Use keyword search in Topbar component in FTW
slug: use-keyword-search-in-topbar
updated: 2019-07-17
category: howto-search
ingress:
  This guide describes how to change the Topbar search from location
  search to keyword search in FTW-daily and FTW-hourly.
published: true
---

If your marketplace is not location-oriented, but you are using
FTW-daily or FTW-hourly, you might want to use the keyword search in the
Topbar component instead of location search.

> **Note:** FTW-product use Keyword search by default and it's
> configurable through _src/config/config.js_. You can skip this
> cookbook article.

## How to use the keyword search in Topbar

This is a rough guide of what you should do to change the search in
Topbar to use keywords instead of the location.

Essentially there are 2 components that need to be changed:

- **TopbarSearchForm** (in _src/forms_ directory)
- **Topbar** (in _src/components_ directory)

### Change TopbarSearchFormComponent

This form contains LocationAutocompleteInput component, which you should
replace with an input field of your own.

The main component could be changed to the following structure:

```js
class TopbarSearchFormComponent extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchInput = React.createRef();
  }

  onSubmit(values) {
    this.props.onSubmit({ keywords: values.keywords });
    // blur search input to hide software keyboard
    if (this.searchInput.current) {
      this.searchInput.current.blur();
    }
  }

  render() {
    return (
      <FinalForm
        {...this.props}
        onSubmit={this.onSubmit}
        render={formRenderProps => {
          const {
            rootClassName,
            className,
            intl,
            isMobile,
            handleSubmit,
          } = formRenderProps;
          const classes = classNames(rootClassName, className);
          return (
            <Form className={classes} onSubmit={handleSubmit}>
              <Field
                name="keywords"
                render={({ input, meta }) => {
                  return (
                    <input
                      className={
                        isMobile
                          ? css.mobileInputRoot
                          : css.desktopInputRoot
                      }
                      {...input}
                      id="keyword-search"
                      ref={this.searchInput}
                      type="text"
                      placeholder={intl.formatMessage({
                        id: 'TopbarSearchForm.placeholder',
                      })}
                      autoComplete="off"
                    />
                  );
                }}
              />
            </Form>
          );
        }}
      />
    );
  }
}
```

So, you need to change the `<input>` component, wrap it with Final
Form's `<Field>` component and then remove the `onChange` function and
pass-in an `onSubmit` function.

You should note that there's one essential functionality missing: you
need to prefill keyword search input with
[initial value](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/SearchPage/FilterComponent.js#L92),
which you get from
[URL params](https://github.com/sharetribe/flex-template-web/blob/master/src/containers/SearchPage/SearchPage.js#L161).

You also need to style the component for both mobile and desktop
layouts.

### Change Topbar

TopbarSearchForm sends the submitted values to `handleSubmit` function
in Topbar component. There you need to change the redirection logic so
that location related search params are removed and `keywords` parameter
is added.

```js
  handleSubmit(values) {
    const { currentSearchParams } = this.props;
    const keywords = values.keywords;
    const { history } = this.props;
    const searchParams = {
      ...currentSearchParams,
      keywords,
    };
    history.push(createResourceLocatorString('SearchPage', routeConfiguration(), {}, searchParams));
  }
```
