const puppeteer = require("puppeteer");

function buildResumeHTML(data, links = {}) {
  const { linkedin, github, portfolio, projectLinks = [], certifications = [] } = links;
  const experienceHTML = (data.experience || [])
    .map(
      (exp) => `
      <div class="section-item">
        <div class="item-header">
          <span class="item-title">${exp.title} — ${exp.company}</span>
          <span class="item-date">${exp.duration}</span>
        </div>
        <ul>
          ${(exp.bullets || []).map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>`
    )
    .join("");

  const educationHTML = (data.education || [])
    .map(
      (edu) => `
      <div class="section-item">
        <div class="item-header">
          <span class="item-title">${edu.degree}</span>
          <span class="item-date">${edu.year}</span>
        </div>
        <p>${edu.institution}</p>
      </div>`
    )
    .join("");

  const projectsHTML = (data.projects || [])
    .map(
      (proj, index) => {
        const link = projectLinks[index] || proj.link;
        return `
      <div class="section-item">
        <div class="item-header">
          ${link ? `<a href="${link}" class="item-title" style="color: #1e293b; text-decoration: none;">${proj.name}</a>` : `<span class="item-title">${proj.name}</span>`}
        </div>
        <p>${proj.description}</p>
        <p class="tech-tags">${(proj.tech || []).join(" · ")}</p>
      </div>`;
      }
    )
    .join("");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
* { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      font-size: 12.5px;
      color: #1a1a1a;
      padding: 36px 48px;
      line-height: 1.5;
    }
    .header {
      border-bottom: 2px solid #2563eb;
      padding-bottom: 10px;
      margin-bottom: 16px;
    }
    .header h1 {
      font-size: 24px;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: 0.02em;
    }
    .contact {
      display: flex;
      gap: 14px;
      font-size: 11.5px;
      color: #475569;
      margin-top: 4px;
      flex-wrap: wrap;
    }
    .section {
      margin-bottom: 14px;
    }
    .section-title {
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #2563eb;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 3px;
      margin-bottom: 8px;
    }
    .section-item {
      margin-bottom: 10px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
    }
    .item-title {
      font-weight: 600;
      color: #1e293b;
      font-size: 12.5px;
    }
    .item-date {
      font-size: 11px;
      color: #64748b;
      white-space: nowrap;
    }
    ul {
      padding-left: 16px;
      margin-top: 3px;
    }
    ul li {
      margin-bottom: 2px;
      color: #334155;
      font-size: 12px;
    }
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .skill-tag {
      background: #eff6ff;
      color: #1d4ed8;
      padding: 2px 9px;
      border-radius: 4px;
      font-size: 11.5px;
      font-weight: 500;
    }
    .tech-tags {
      color: #64748b;
      font-size: 11px;
      margin-top: 2px;
    }
    .summary {
      color: #334155;
      line-height: 1.65;
      font-size: 12px;
    }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${data.name || "Candidate Name"}</h1>
       <div class="contact">
        <span>${data.email || ""}</span>
        <span>${data.phone || ""}</span>
        <span>${data.location || ""}</span>
        ${linkedin ? `<a href="${linkedin}" style="color:#2563eb;">LinkedIn</a>` : ""}
        ${github ? `<a href="${github}" style="color:#2563eb;">GitHub</a>` : ""}
        ${portfolio ? `<a href="${portfolio}" style="color:#2563eb;">Portfolio</a>` : ""}
      </div>
      </div>

      ${data.summary ? `
      <div class="section">
        <div class="section-title">Summary</div>
        <p class="summary">${data.summary}</p>
      </div>` : ""}

      ${data.skills?.length ? `
      <div class="section">
        <div class="section-title">Skills</div>
        <div class="skills-grid">
          ${data.skills.map((s) => `<span class="skill-tag">${s}</span>`).join("")}
        </div>
      </div>` : ""}

      ${data.experience?.length ? `
      <div class="section">
        <div class="section-title">Experience</div>
        ${experienceHTML}
      </div>` : ""}

      ${data.projects?.length ? `
      <div class="section">
        <div class="section-title">Projects</div>
        ${projectsHTML}
      </div>` : ""}

      ${data.education?.length ? `
      <div class="section">
        <div class="section-title">Education</div>
        ${educationHTML}
      </div>` : ""}
      ${certifications.length ? `
      <div class="section">
        <div class="section-title">Certifications</div>
        ${certifications.map((cert, i) => `
          <div class="section-item">
            <a href="${cert}" style="color:#2563eb;font-size:12px;">${cert}</a>
          </div>
        `).join("")}
      </div>` : ""}
    </body>
    </html>
  `;
}

async function generateResumePDF(resumeData, links = {}) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const html = buildResumeHTML(resumeData, links);

  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: "20px", bottom: "20px", left: "0px", right: "0px" },
  });

  await browser.close();
  return pdfBuffer;
}

module.exports = { generateResumePDF };