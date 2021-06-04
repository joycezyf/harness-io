import React from 'react'
import {
  GithubOutlined,
  ExportOutlined,
  FacebookFilled,
  LinkedinFilled,
  TwitterOutlined
} from '@ant-design/icons'

import css from './Footer.module.scss'

export default function Footer(props) {
  return (
    <footer className={css.footer}>
      <div className={css.siteMapNFollowUs}>
        <div className={css.siteMap}>
          <ul>
            <div className={css.title}>Products</div>
            <li>CI/CD Platform Overview</li>
            <li>Continuous Integration</li>
            <li>Continuous Delivery</li>
            <li>Cloud Cost Management</li>
            <li>Feature Flags</li>
            <li>Change Intelligence</li>
          </ul>
          <ul>
            <div className={css.title}>Use Cases</div>
            <li>Self-Service Continuous Delivery</li>
            <li>Public Cloud Migration</li>
            <li>Kubernetes Deployments</li>
            <li>Scaling Beyond Jenkins Pipelines</li>
            <li>Spinnaker Not Enough</li>
            <li>Modern Applications</li>
            <li>DevSecOps – Compliance &amp; Governance</li>
            <li>Cloud Cost Management</li>
            <li>GitOps</li>
            <li>Automation</li>
            <li>Verification</li>
          </ul>
          <ul>
            <div className={css.title}>Resources</div>
            <li>Documentation</li>
            <li>Integrations</li>
            <li>API</li>
            <li>DevOps tools</li>
            <li>Blogs</li>
            <li>
              Community <ExportOutlined />
            </li>
            <li>Upcoming events and webinars</li>
            <li>On-demand videos tools</li>
            <li>Collaterals</li>
          </ul>
          <ul>
            <div className={css.title}>Company</div>
            <li>About</li>
            <li>Press &amp; News</li>
            <li>Partners</li>
            <li>Events</li>
            <li>T-Shirt Store</li>
            <li>Careers</li>
            <li>Contact Sales</li>
            <li>Contact HQ</li>
            <li>Customers</li>
          </ul>
          <ul>
            <div className={css.title}>Pricing</div>
            <li>Get Started</li>
            <li>Contact Sales</li>
            <li>Request a Quote</li>
            <li>Jenkins vs Harness</li>
            <li>Argo CD vs Harness</li>
            <li>Spinnaker vs Harness</li>
            <li>Kubecost vs Harness</li>
            <li>Jenkins vs Drone</li>
          </ul>
        </div>
        <div className={css.logoIcons}>
          <div className={css.logo}>
            {/* <img src="/harness.svg" /> */}
            <div className={css.img}></div>
          </div>
          <ul className={css.followUs}>
            <div>Follow us</div>
            <li>
              <GithubOutlined />
            </li>
            <li>
              <FacebookFilled />
            </li>
            <li>
              <LinkedinFilled />
            </li>
            <li>
              <TwitterOutlined />
            </li>
          </ul>
        </div>
      </div>
      <div className={css.termsNPolicies}>
        <ul>
          <li>Subscription Terms</li>
          <li>Website Terms of Use</li>
          <li>Privacy Policy</li>
          <li>Cookie Settings</li>
        </ul>
        <div className={css.copyRight}>© 2021 Harness Inc.</div>
      </div>
    </footer>
  )
}
