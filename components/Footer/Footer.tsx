import css from "./Footer.module.css"

export default function Footer() {
return (<footer className={css.footer}>
  <div className={css.content}>
    <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
    <div className={css.wrap}>
      <p>Developer: Serhii Kravchenko</p>
      <p>
        Contact us:
        <a href="mailto:serhii.kravchenkooo@gmail.com"> serhii.kravchenkooo@gmail.com</a>
      </p>
    </div>
  </div>
</footer>)
}