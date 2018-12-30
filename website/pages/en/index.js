/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require("react");

const CompLibrary = require("../../core/CompLibrary.js");

const MarkdownBlock = CompLibrary.MarkdownBlock; /* Used to read markdown */
const Container = CompLibrary.Container;
const GridBlock = CompLibrary.GridBlock;

class HomeSplash extends React.Component {
  render() {
    const { siteConfig, language = "" } = this.props;
    const { baseUrl, docsUrl } = siteConfig;
    const docsPart = `${docsUrl ? `${docsUrl}/` : ""}`;
    const langPart = `${language ? `${language}/` : ""}`;
    const docUrl = doc => `${baseUrl}${docsPart}${langPart}${doc}`;

    const SplashContainer = props => (
      <div className="homeContainer">
        <div className="homeSplashFade">
          <div className="wrapper homeWrapper">{props.children}</div>
        </div>
      </div>
    );

    const Logo = props => (
      <div className="projectLogo">
        <img src={props.img_src} alt="Project Logo" />
      </div>
    );

    const ProjectTitle = () => (
      <div>
        <h2 className="projectTitle">{siteConfig.title}</h2>
        <div className="projectTaglineWrapper">
          <p className="projectTagline">{siteConfig.tagline}</p>
        </div>
      </div>
    );

    const PromoSection = props => (
      <div className="section promoSection">
        <div className="promoRow">
          <div className="pluginRowBlock">{props.children}</div>
        </div>
      </div>
    );

    const Button = props => (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={props.href} target={props.target}>
          {props.children}
        </a>
      </div>
    );

    return (
      <SplashContainer>
        <Logo img_src={`${baseUrl}img/logo-large.png`} />
        <div className="inner">
          <ProjectTitle siteConfig={siteConfig} />
          <PromoSection>
            <Button href={docUrl("readme.html")}>Get Started</Button>
          </PromoSection>
        </div>
      </SplashContainer>
    );
  }
}

const exampleCode =
  "```js\n\
import {render} from 'react-testing-library'; \n\
import 'jest-dom/expect'; \n\
\n\
test('renders greeting', () => {\n\
  const {getByText} = render(<MyComponent />);\n\
  expect(getByText('Hello, World!')).toBeInTheDocument();\n\
});\n\
```\
";

class Index extends React.Component {
  render() {
    const { config: siteConfig, language = "" } = this.props;
    const { baseUrl } = siteConfig;

    const Block = props => (
      <Container
        padding={["bottom", "top"]}
        id={props.id}
        background={props.background}
      >
        <GridBlock
          align={props.align || "center"}
          imageAlign={props.imageAlign || "center"}
          contents={props.children}
          layout={props.layout}
        />
      </Container>
    );

    const FeatureCallout = () => (
      <Container className="" background={"light"} padding={["top", "bottom"]}>
        <div style={{ textAlign: "center" }}>
          <p>
            <i>
              The more your tests resemble the way your software is used, <br />
              the more confidence they can give you.
            </i>
          </p>
          <MarkdownBlock>
            `npm install --save-dev react-testing-library`
          </MarkdownBlock>
        </div>
      </Container>
    );

    const TryOut = () => (
      <Block id="try">
        {[
          {
            content: exampleCode,
            image: `${baseUrl}img/hammer-wrench-128x128.png`,
            imageAlign: "left",
            title: "Try it Out"
          }
        ]}
      </Block>
    );

    const Problem = () => (
      <React.Fragment>
        <Block background={"light"} align="left">
          {[
            {
              title: "",
              content:
                "## The Problem \n - You want tests for your React components that avoid including implementation details and rather focus on making your tests give you the confidence for which they are intended. \n - You want your tests to be maintainable so refactors _(changes to implementation but not functionality)_ don't break your tests and slow you and your team down.",
              image: `${baseUrl}img/interrobang-128x128.png`,
              imageAlt: "The problem (picture of a question mark)",
              imageAlign: "left"
            }
          ]}
        </Block>
      </React.Fragment>
    );

    const Solution = () => (
      <Block background={null} align="left">
        {[
          {
            title: "",
            image: `${baseUrl}img/star-128x128.png`,
            imageAlign: "right",
            imageAlt: "The solution (picture of a star)",
            content:
              "## The Solution \n `react-testing-library` is a very light-weight solution for testing React components. It provides utility functions on top of react-dom and react-dom/test-utils in a way that encourages better testing practices. Its primary guiding principle is: \n > The more your tests resemble the way your software is used, the more confidence they can give you."
          }
        ]}
      </Block>
    );

    const Features = () => (
      <React.Fragment>
        <Block layout="twoColumn">
          {[
            {
              content:
                "Tests only break when your app breaks, not implementation details",
              image: `${baseUrl}img/wrench-128x128.png`,
              imageAlign: "top",
              title: "Write Maintainable Tests"
            },
            {
              content: "Interact with your app the same way as your users",
              image: `${baseUrl}img/check-128x128.png`,
              imageAlign: "top",
              title: "Develop with Confidence"
            },
            {
              content:
                "Built-in selectors use semantic HTML and ARIA roles to help you write inclusive code",
              image: `${baseUrl}img/tada-128x128.png`,
              imageAlign: "top",
              title: "Accessible by Default"
            }
          ]}
        </Block>
      </React.Fragment>
    );

    const Showcase = () => {
      if ((siteConfig.users || []).length === 0) {
        return null;
      }

      const showcase = siteConfig.users
        .filter(user => user.pinned)
        .map(user => (
          <a href={user.infoLink} key={user.infoLink}>
            <img src={user.image} alt={user.caption} title={user.caption} />
          </a>
        ));

      const pageUrl = page => baseUrl + (language ? `${language}/` : "") + page;

      return (
        <div className="productShowcaseSection paddingBottom">
          <h2>Who is Using This?</h2>
          <div className="logos">{showcase}</div>
          <div className="more-users">
            <a className="button" href={pageUrl("users.html")}>
              More {siteConfig.title} Users
            </a>
          </div>
        </div>
      );
    };

    return (
      <div>
        <HomeSplash siteConfig={siteConfig} language={language} />
        <div className="mainContainer">
          <FeatureCallout />
          <Features />
          {/* <TryOut /> */}
          <Problem />
          <Solution />
          <Showcase />
        </div>
      </div>
    );
  }
}

module.exports = Index;
