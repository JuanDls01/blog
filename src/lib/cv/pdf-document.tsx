import path from "node:path";
import { Document, Page, View, Text, Image, Svg, Path, Circle, Font, StyleSheet } from "@react-pdf/renderer";
import { identity, skills, type CvContent } from "./data";

const fontsDir = path.join(process.cwd(), "src/lib/cv/fonts");

Font.register({
  family: "Geist",
  fonts: [
    { src: path.join(fontsDir, "Geist-Regular.ttf"), fontWeight: 400 },
    { src: path.join(fontsDir, "Geist-Medium.ttf"), fontWeight: 500 },
    { src: path.join(fontsDir, "Geist-SemiBold.ttf"), fontWeight: 600 },
    { src: path.join(fontsDir, "Geist-Bold.ttf"), fontWeight: 700 },
  ],
});
// Long unbroken tokens (email, urls) get an explicit break point instead —
// the default hyphenator otherwise splits words with an ugly inserted "-".
Font.registerHyphenationCallback((word) => [word]);

const colors = {
  ink: "#1a1a19",
  muted: "#6f6f6c",
  faint: "#a3a39e",
  hairline: "#dcdad6",
  sidebarBg: "#1a1a19",
  sidebarText: "#fdfdfc",
  sidebarMuted: "#c9c4bc",
  sidebarFaint: "#948e85",
  sidebarLine: "rgba(255,255,255,0.16)",
  sidebarSurface: "rgba(255,255,255,0.08)",
  paper: "#fdfdfc",
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    fontFamily: "Geist",
    fontSize: 9,
    color: colors.ink,
  },
  sidebar: {
    width: 198,
    backgroundColor: colors.sidebarBg,
    color: colors.sidebarText,
    padding: 24,
    flexDirection: "column",
    gap: 22,
  },
  main: {
    flex: 1,
    backgroundColor: colors.paper,
    padding: "32 20",
    flexDirection: "column",
    gap: 20,
  },

  // Sidebar — photo block
  photoBlock: { alignItems: "center", gap: 11 },
  photo: {
    width: 84,
    height: 84,
    borderRadius: 42,
    border: `2 solid rgba(255,255,255,0.2)`,
    objectFit: "cover",
  },
  name: {
    fontSize: 14,
    fontWeight: 600,
    textAlign: "center",
    lineHeight: 1.25,
    letterSpacing: -0.2,
  },
  role: {
    fontSize: 8,
    fontWeight: 500,
    color: colors.sidebarMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },

  // Sidebar — sections
  sideSection: { gap: 9 },
  sideLabel: {
    fontSize: 8,
    fontWeight: 600,
    color: colors.sidebarFaint,
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingBottom: 6,
    borderBottom: `1 solid ${colors.sidebarLine}`,
  },

  contactRow: { flexDirection: "row", gap: 7, alignItems: "flex-start" },
  contactIcon: { width: 8.5, height: 8.5, marginTop: 1.5 },
  contactText: { fontSize: 7.8, color: colors.sidebarText, lineHeight: 1.4 },

  skillChips: { flexDirection: "row", flexWrap: "wrap", gap: 5 },
  skillChip: {
    fontSize: 7.5,
    lineHeight: 1,
    color: colors.sidebarMuted,
    backgroundColor: colors.sidebarSurface,
    borderRadius: 3,
    padding: "3.5 6.5",
  },

  eduList: { gap: 10 },
  eduDegree: { fontSize: 8.5, fontWeight: 600, lineHeight: 1.3 },
  eduSchool: { fontSize: 7.8, color: colors.sidebarMuted, marginTop: 2 },
  eduPeriod: { fontSize: 7.2, color: colors.sidebarFaint, marginTop: 2 },

  langList: { gap: 6 },
  langRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "baseline" },
  langName: { fontSize: 8.5, fontWeight: 600 },
  langLevel: { fontSize: 7.5, color: colors.sidebarMuted },

  // Main — section labels (full-width underline)
  mainSection: { gap: 10 },
  mainLabel: {
    fontSize: 9.5,
    fontWeight: 600,
    color: colors.ink,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    paddingBottom: 5,
    borderBottom: `1.3 solid ${colors.ink}`,
  },

  profileText: { fontSize: 9, lineHeight: 1.55, color: colors.muted },

  expItem: { gap: 3, paddingVertical: 5 },
  expHead: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-end", gap: 10 },
  expCompany: { fontSize: 9.5, fontWeight: 700 },
  expRole: { fontWeight: 500, color: colors.muted },
  expPeriod: { fontSize: 8, color: colors.faint },
  expBullets: { marginTop: 2, gap: 2.5 },
  expBulletRow: { flexDirection: "row", gap: 5 },
  expBulletMark: { fontSize: 8.5, color: colors.faint },
  expBulletText: { fontSize: 8.3, color: colors.muted, lineHeight: 1.5, flex: 1 },

  projGrid: { flexDirection: "row", flexWrap: "wrap", gap: 14 },
  projCard: { width: 170, gap: 4 },
  projTitle: { fontSize: 9.3, fontWeight: 700 },
  projDesc: { fontSize: 8.3, color: colors.muted, lineHeight: 1.45 },
  projTags: { flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 2 },
  projTag: {
    fontSize: 6.8,
    lineHeight: 1,
    fontWeight: 500,
    color: colors.faint,
    border: `1 solid ${colors.hairline}`,
    borderRadius: 3,
    padding: "2 5",
  },
});

function MailIcon() {
  return (
    <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
      <Path d="M4 4h16v16H4z" stroke={colors.sidebarFaint} strokeWidth={2} fill="none" />
      <Path d="m4 6 8 7 8-7" stroke={colors.sidebarFaint} strokeWidth={2} fill="none" />
    </Svg>
  );
}
function PhoneIcon() {
  return (
    <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
      <Path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"
        stroke={colors.sidebarFaint}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}
function PinIcon() {
  return (
    <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
      <Path
        d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
        stroke={colors.sidebarFaint}
        strokeWidth={2}
        fill="none"
      />
      <Circle cx={12} cy={10} r={3} stroke={colors.sidebarFaint} strokeWidth={2} fill="none" />
    </Svg>
  );
}
function LinkedinIcon() {
  return (
    <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
      <Path
        d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"
        stroke={colors.sidebarFaint}
        strokeWidth={2}
        fill="none"
      />
      <Path d="M2 9h4v12H2z" stroke={colors.sidebarFaint} strokeWidth={2} fill="none" />
      <Circle cx={4} cy={4} r={2} stroke={colors.sidebarFaint} strokeWidth={2} fill="none" />
    </Svg>
  );
}
function GlobeIcon() {
  return (
    <Svg viewBox="0 0 24 24" style={styles.contactIcon}>
      <Circle cx={12} cy={12} r={10} stroke={colors.sidebarFaint} strokeWidth={2} fill="none" />
      <Path
        d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"
        stroke={colors.sidebarFaint}
        strokeWidth={2}
        fill="none"
      />
    </Svg>
  );
}

export function CvDocument({ content, locale }: { content: CvContent; locale: string }) {
  const [emailUser, emailDomain] = identity.email.split("@");
  const contactRows = [
    { icon: <MailIcon />, lines: [emailUser, `@${emailDomain}`] },
    identity.phone ? { icon: <PhoneIcon />, lines: [identity.phone] } : null,
    identity.location ? { icon: <PinIcon />, lines: [identity.location] } : null,
    { icon: <LinkedinIcon />, lines: [identity.linkedin] },
    { icon: <GlobeIcon />, lines: [identity.portfolio] },
  ].filter(Boolean) as { icon: JSX.Element; lines: string[] }[];

  return (
    <Document
      title={`${identity.firstName} ${identity.lastName} — CV`}
      author={`${identity.firstName} ${identity.lastName}`}
      language={locale}
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.sidebar}>
          <View style={styles.photoBlock}>
            <Image src={path.join(process.cwd(), "src/lib/cv/cv-photo.jpg")} style={styles.photo} />
            <View>
              <Text style={styles.name}>{identity.firstName}</Text>
              <Text style={styles.name}>{identity.lastName}</Text>
            </View>
            <Text style={styles.role}>{content.role}</Text>
          </View>

          <View style={styles.sideSection}>
            <Text style={styles.sideLabel}>{content.sections.contact}</Text>
            <View style={{ gap: 7 }}>
              {contactRows.map((row) => (
                <View key={row.lines[0]} style={styles.contactRow}>
                  {row.icon}
                  <View>
                    {row.lines.map((line) => (
                      <Text key={line} style={styles.contactText}>
                        {line}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sideSection}>
            <Text style={styles.sideLabel}>{content.sections.skills}</Text>
            <View style={styles.skillChips}>
              {skills.map((skill) => (
                <Text key={skill} style={styles.skillChip}>
                  {skill}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.sideSection}>
            <Text style={styles.sideLabel}>{content.sections.education}</Text>
            <View style={styles.eduList}>
              {content.education.map((item) => (
                <View key={item.key}>
                  <Text style={styles.eduDegree}>{item.degree}</Text>
                  <Text style={styles.eduSchool}>{item.school}</Text>
                  <Text style={styles.eduPeriod}>{item.period}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.sideSection}>
            <Text style={styles.sideLabel}>{content.sections.languages}</Text>
            <View style={styles.langList}>
              {content.languages.map((item) => (
                <View key={item.key} style={styles.langRow}>
                  <Text style={styles.langName}>{item.name}</Text>
                  <Text style={styles.langLevel}>{item.level}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.main}>
          <View style={styles.mainSection}>
            <Text style={styles.mainLabel}>{content.sections.profile}</Text>
            <Text style={styles.profileText}>{content.profileSummary}</Text>
          </View>

          <View style={styles.mainSection}>
            <Text style={styles.mainLabel}>{content.sections.experience}</Text>
            <View>
              {content.experience.map((job) => (
                <View key={job.key} style={styles.expItem}>
                  <View style={styles.expHead}>
                    <Text style={styles.expCompany}>
                      {job.company} <Text style={styles.expRole}>— {job.role}</Text>
                    </Text>
                    <Text style={styles.expPeriod}>{job.period}</Text>
                  </View>
                  <View style={styles.expBullets}>
                    {job.bullets.map((bullet) => (
                      <View key={bullet} style={styles.expBulletRow}>
                        <Text style={styles.expBulletMark}>—</Text>
                        <Text style={styles.expBulletText}>{bullet}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.mainSection}>
            <Text style={styles.mainLabel}>{content.sections.projects}</Text>
            <View style={styles.projGrid}>
              {content.projects.map((project) => (
                <View key={project.key} style={styles.projCard}>
                  <Text style={styles.projTitle}>{project.title}</Text>
                  <Text style={styles.projDesc}>{project.description}</Text>
                  <View style={styles.projTags}>
                    {project.tags.map((tag) => (
                      <Text key={tag} style={styles.projTag}>
                        {tag}
                      </Text>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
