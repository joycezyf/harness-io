import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, Collapse } from 'antd'
import {
  CloseCircleFilled,
  CheckCircleFilled,
  GithubOutlined,
  DownOutlined,
  ExportOutlined,
  FacebookFilled,
  LinkedinFilled,
  TwitterOutlined,
  MenuOutlined,
  CloseOutlined
} from '@ant-design/icons'
import Marquee from 'react-fast-marquee'
import cx from 'classnames'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import { GET_PAGE } from '../../queries'
import {
  debounce,
  getScrollTop,
  scrollTo,
  getClientWidth
} from '../../common/util'
import client from '../../common/apollo-client-ref'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import css from './index.module.scss'

const { Panel } = Collapse

export default function Product(props) {
  const [imgLoaded, setImgLoaded] = useState({})

  const [scrollTop, setScrollTop] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  const [activeMobileMenu, setActiveMobileMenu] = useState([])
  useEffect(() => {
    if (window.addEventListener) {
      window.addEventListener('scroll', debounceScroll)
      window.addEventListener('resize', debounceScroll)
      return function cleanup() {
        window.removeEventListener('scroll', debounceScroll)
        window.removeEventListener('resize', debounceScroll)
      }
    } else if (window.attachEvent) {
      window.attachEvent('onscroll', debounceScroll)
      window.attachEvent('onresize', debounceScroll)
      return function cleanup() {
        window.detachEvent('onscroll', debounceScroll)
        window.detachEvent('onresize', debounceScroll)
      }
    }
  })

  function handleScroll(e) {
    const rawScrollTop = getScrollTop() // document.documentElement.scrollTop
    const rawClientTop = getClientWidth()
    setScrollTop(rawScrollTop)
    setClientWidth(rawClientTop)
  }
  const debounceScroll = debounce(handleScroll, 600)

  function handleCollapse(active) {
    // workaround, better solution TBD.
    if (active.length > activeMobileMenu.length) {
      const rawScrollTop = getScrollTop()
      scrollTo(0, rawScrollTop + 100)
    }
    setActiveMobileMenu([...active])
  }

  function handleImgLoad(e, imgId) {
    setTimeout(
      () =>
        setImgLoaded(loaded => Object.assign({}, loaded, { [imgId]: true })),
      500
    )
  }

  const {
    // loading,
    error,
    data: {
      marketingSite: {
        heroTitle = 'The Modern Software Delivery Platform',
        heroSubTitle = `Loved by Developers
        Trusted by Businesses`,
        piplineTitle,
        pipelineDesc,
        developerTitle,
        developerDesc,
        aiTitle,
        aiDesc,
        governaceTitle,
        governaceDesc,
        cdTitle,
        cdSubTitle,
        cdDesc,
        ciTitle,
        ciSubTitle,
        ciDesc,
        cloudCostTitle,
        cloudCostSubTitle,
        cloudCostDesc,
        featureFlagsTitle,
        featureFlagsSubTitle,
        featureFlagsDesc,
        chIntelTitle,
        chIntelSubTitle,
        chIntelDesc,
        caseStudy1,
        caseStudy1Client,
        caseStudy2,
        caseStudy2Client
      } = {}
    } = {}
  } = props
  if (error) {
    return (
      <div className="container">
        <img src="/harness-light.svg" />
        <h3>Ooooops! Something goes wrong...</h3>
        <div className="link">
          <Link href="/">
            <a>Head back to our Homepage</a>
          </Link>
        </div>
        <style jsx>{`
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          h3 {
            margin: 36px;
          }
          .link {
            font-size: 18px;
            font-weight: 600;
          }
        `}</style>
      </div>
    )
  }

  const isMobile = clientWidth > 0 && clientWidth < 1440
  return (
    <>
      <Header />
      {/* {!showMobileMenu && ( */}
      <>
        <main className={css.main}>
          <div className={css.harnessIntro}>
            <div className={css.introTextContainer}>
              <div className={css.introText}>Continuous Integration</div>
              <div
                className={css.introSubText}
                // dangerouslySetInnerHTML={{
                //   __html: heroSubTitle.replace(/\n/g, '<br />')
                // }}
              >
                Take Source Code To Artifact
              </div>
              <div className={css.introDesc}>
                Harness CI (formerly Drone) is a self-service CI solution that
                is container-native so all builds are isolated, and all
                extensions are standardized. Kiss your butler goodbye.
              </div>
              <Button type="primary" className={css.btnSignUp}>
                Sign Up for Free
              </Button>
              <div className={css.gitStar}>
                <iframe
                  src="https://ghbtns.com/github-btn.html?user=drone&repo=ui-core&type=star&count=true"
                  frameBorder="0"
                  scrolling="0"
                  width="150"
                  height="20"
                  title="GitHub"
                ></iframe>
              </div>
            </div>
            <div className={css.introIllustration}>
              <img
                src="/product-video-placeholder.svg"
                width="650"
                height="374"
                // muted={true}
                // autoPlay={true}
                // loop={true}
              />
            </div>
          </div>
          <div className={cx(css.customers, css.bgDot)}>
            <div className={css.consumerList}>
              <Marquee gradient={false}>
                <img src="/customer-logo.svg" width="228" height="64" />
                <img src="/customer-logo.svg" width="228" height="64" />
                <img src="/customer-logo.svg" width="228" height="64" />
                <img src="/customer-logo.svg" width="228" height="64" />
                <img src="/customer-logo.svg" width="228" height="64" />
                <img src="/customer-logo.svg" width="228" height="64" />
                <img src="/customer-logo.svg" width="228" height="64" />
              </Marquee>
            </div>
            <div className={css.btnContaner}>
              <Button className={css.btnLight}>Meet Our Customers</Button>
            </div>
          </div>

          <div className={css.motionPathContainer}>
            <div className={css.productFeatures}>
              <h3 className={css.title}>Features Every Great Team Needs</h3>
              <ul>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-canary.svg" width="45" height="42" />
                  </div>
                  <h5 className={css.subTitle}>
                    Automated Canary &amp; Blue-Green Deployments
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-rollbacks.svg" width="56" height="74" />
                  </div>
                  <h5 className={css.subTitle}>
                    ML-based Automated Deployment Verification &amp; Rollbacks
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-pipeline.svg" width="69" height="56" />
                  </div>
                  <h5 className={css.subTitle}>
                    Developer Friendly Pipeline-as-Code Experience
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img
                      src="feature-notification.svg"
                      width="49"
                      height="38"
                    />
                  </div>
                  <h5 className={css.subTitle}>
                    Integrated Approval &amp; Notification flows
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-infra.svg" width="58" height="60" />
                  </div>
                  <h5 className={css.subTitle}>
                    Automated Infrastructure Provisioning
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-lib.svg" width="62" height="70" />
                  </div>
                  <h5 className={css.subTitle}>
                    Flexible Parametrization &amp; Template Library
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-audit.svg" width="66" height="66" />
                  </div>
                  <h5 className={css.subTitle}>
                    Pipeline Governance &amp; Audit Trails
                  </h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
                <li>
                  <div className={css.subIcon}>
                    <img src="feature-security.svg" width="71" height="73" />
                  </div>
                  <h5 className={css.subTitle}>Enterprise-grade Security</h5>
                  <div className={css.subCon}>
                    More details describing the features, such as, a
                    self-service platform solution for every team. The Harness
                    CI/CD Platform enables software changes of all types to
                    reach production environments in a safe, quick, and
                    sustainable way.
                  </div>
                </li>
              </ul>
            </div>

            <div className={css.sectionIntegrations}>
              <div className={css.inner}>
                <div className={css.text}>
                  <div className={css.sup}>Integrations</div>
                  <div className={css.title}>
                    Seamless Integration with your DevOps Toolchain
                  </div>
                  <div className={css.desc}>
                    We know that teams live and die by their tools. Harness
                    integrates with, and orchestrates your entire stack.
                  </div>

                  <Button>View all integrations</Button>
                </div>
                <div className={css.logos}>
                  <img src="/icon_aws.svg" width="56" height="56" alt="AWS" />
                  <img src="/icon_gcp.svg" width="56" height="56" alt="GCP" />
                  <img
                    src="/icon_open_shift.svg"
                    width="56"
                    height="56"
                    alt="Open Shift"
                  />
                  <img
                    src="/icon_k8s.svg"
                    width="56"
                    height="56"
                    alt="Kubernetes"
                  />
                  <img
                    src="/icon_azure.svg"
                    width="56"
                    height="56"
                    alt="Azure"
                  />
                  <img
                    src="/icon_pivotal.svg"
                    width="56"
                    height="56"
                    alt="Pivotal"
                  />
                  <img
                    src="/icon_jenkins.svg"
                    width="56"
                    height="56"
                    alt="Jenkins"
                  />
                  <img
                    src="/icon_bamboo.svg"
                    width="56"
                    height="56"
                    alt="Bamboo"
                  />
                  <img src="/icon_helm.svg" width="56" height="56" alt="HELM" />
                  <img
                    src="/icon_docker.svg"
                    width="56"
                    height="56"
                    alt="Docker"
                  />
                  <img
                    src="/icon_artifactory.svg"
                    width="56"
                    height="56"
                    alt="Artifactory"
                  />
                  <img
                    src="/icon_terraform.svg"
                    width="56"
                    height="56"
                    alt="Terraform"
                  />
                  <img
                    src="/icon_aws_cloud_formation.svg"
                    width="56"
                    height="56"
                    alt="AWS Cloud Formation"
                  />
                  <img
                    src="/icon_aws_cloud_watch.svg"
                    width="56"
                    height="56"
                    alt="AWS Cloud Watch"
                  />
                  <img
                    src="/icon_aws_lambda.svg"
                    width="56"
                    height="56"
                    alt="AWS Lambda"
                  />
                  <img
                    src="/icon_aws_ecs.svg"
                    width="56"
                    height="56"
                    alt="AWS ECS"
                  />
                  <img
                    src="/icon_new_relic.svg"
                    width="56"
                    height="56"
                    alt="New Relic"
                  />
                  {/* <img src="/icon_sumo_logic.svg" width="56" height="56" alt="Sumo Logic" />
                  <img src="/icon_splunk.svg" width="56" height="56" alt="Splunk" /> */}
                  <img
                    src="/icon_elastic.svg"
                    width="56"
                    height="56"
                    alt="Elastic"
                  />
                  <img
                    src="/icon_data_dog.svg"
                    width="56"
                    height="56"
                    alt="Data Dog"
                  />
                  <img
                    src="/icon_dynatrace.svg"
                    width="56"
                    height="56"
                    alt="Dynatrace"
                  />
                </div>
              </div>
            </div>

            <div className={cx(css.caseStudy, css.bgDot)}>
              <div className={css.sectionWrapper}>
                <div className={css.quote}>
                  <img src="/quote.svg" width="34" height="26" />
                </div>
                <div className={css.customersSay}>{caseStudy1}</div>
                <div className={css.customerName}>{caseStudy1Client}</div>
                <Button className={css.btnLight}>Read Case Study</Button>
                {/* <img src="/favicon.png" className={css.profileRight} onLoad={e => handleImgLoad(e, '/case-study-profile-1.svg')} /> */}
                <LazyLoadImage
                  className={
                    imgLoaded.p1
                      ? css.profileRight
                      : css.profileRightBeforeLoaded
                  }
                  src="/case-study-profile-3.svg"
                  placeholderSrc="/favicon.png"
                  afterLoad={e => handleImgLoad(e, 'p1')}
                  width="236"
                  height="205"
                />
              </div>
            </div>

            <div className={css.sectionPlans}>
              <h3 className={css.title}>Compare Plans</h3>
              <table cellSpacing="0">
                <tr>
                  <th>Plans</th>
                  <th>
                    <h4>Free</h4>
                    Free forever
                    <div className={css.soon}>Launching soon</div>
                  </th>
                  <th>
                    <h4>Team</h4>
                    For teams that need to setup and manage Software delivery
                    with confidence.
                    <Button type="primary">Sign Up For Free</Button>
                    <Button>Contact Sales</Button>
                  </th>
                  <th>
                    <h4>Enterprise</h4>
                    For organizations that need additional security, control,
                    and support.
                    <Button type="primary">Sign Up For Free</Button>
                    <Button>Contact Sales</Button>
                  </th>
                </tr>
                <tr>
                  <td>Services Supported</td>
                  <td>SAAS Only</td>
                  <td>SAAS Only</td>
                  <td>SAAS + On-Premise</td>
                </tr>
                <tr>
                  <td>Users</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Deployment Units</td>
                  <td>5</td>
                  <td>Maximum of 100</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Deployments per day</td>
                  <td>10</td>
                  <td>Unlimited</td>
                  <td>Unlimited</td>
                </tr>
                <tr>
                  <td>Deployment Verification</td>
                  <td><CheckCircleFilled /></td>
                  <td><CheckCircleFilled /></td>
                  <td><CheckCircleFilled /></td>
                </tr>
                <tr>
                  <td>Management at Scale</td>
                  <td><CloseCircleFilled /></td>
                  <td><CloseCircleFilled /></td>
                  <td>
                    Organizations Shared Resources &amp; Template Library Custom
                    Dashboards Data export &amp; reporting Log forwarding into
                    Splunk Delegate Scoping
                  </td>
                </tr>
                <tr>
                  <td>Security</td>
                  <td>Basic</td>
                  <td>Advanced</td>
                  <td>Whitelisting Audit Trail LDAP Authentication</td>
                </tr>
                <tr>
                  <td>Enterprise Governance</td>
                  <td><CloseCircleFilled /></td>
                  <td><CloseCircleFilled /></td>
                  <td>OPA Deployment Time Windows</td>
                </tr>
                <tr>
                  <td>Support</td>
                  <td>Community &amp; Docs</td>
                  <td>Standard + Premiere (20% premium)</td>
                  <td>Standard + Premiere (20% premium)</td>
                </tr>
              </table>
            </div>

            <div className={cx(css.caseStudy, css.bgDotBlue)}>
              <div className={css.sectionWrapper}>
                <div className={css.quote}>
                  <img src="/quote.svg" width="34" height="26" />
                </div>
                <div className={css.customersSay}>{caseStudy2}</div>
                <div className={css.customerName}>{caseStudy2Client}</div>
                <Button className={css.btnLight}>Read Case Study</Button>
                {/* <img src="/favicon.png" className={css.profileLeft} onLoad={e => handleImgLoad(e, '/case-study-profile-2.svg')} /> */}
                <LazyLoadImage
                  className={
                    imgLoaded.p2 ? css.profileLeft : css.profileLeftBeforeLoaded
                  }
                  src="/case-study-profile-4.svg"
                  placeholderSrc="/favicon.png"
                  // beforeLoad={e => handleImgLoad(e, 'p2')}
                  afterLoad={e => handleImgLoad(e, 'p2')}
                  width="313"
                  height="249"
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
      {/* )} */}
      {/* {(showProductMenu  || showLearnMenu || showCompanyMenu) && subMenuMask } */}
    </>
  )
}

export async function getStaticProps(context) {
  const res = await client.query({ query: GET_PAGE, variables: { id: 1 } })
  return {
    props: res // will be passed to the page component as props
  }
}
