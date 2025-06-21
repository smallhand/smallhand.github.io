document.addEventListener("DOMContentLoaded", function () {
  // Scroll to the target section
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      //if (targetId === "#projects") return; // not scroll down

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // some external links
  document.querySelectorAll(".to-github").forEach((ele) => {
    ele.href = "https://github.com/smallhand";
  });
  document.querySelectorAll(".to-linkedin").forEach((ele) => {
    ele.href = "https://www.linkedin.com/in/pei-yu-stella";
  });

  // Navbar highlight the current section
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - 60) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // splits 圖片區永遠顯示
  function showSplitsGallery() {
    const gallery = document.getElementById('splits-gallery');
    gallery.innerHTML = '';
    // 對應資料
    const features = [
      {
        key: '💸 Flexible Expense Input',
        desc: 'Record shared expenses with multiple payers, participants and multi-currency, supporting both equal and custom splits.',
        img: '1-add_item.jpg',
      },
      {
        key: '👥 Pairwise Settlement Calculation',
        desc: 'Automatically calculates debts between every pair of users, showing who owes whom and how much.',
        img: '2-expense.jpg',
      },
      {
        key: '📱 Wise Settlement Calculation',
        desc: 'Minimizes the number of transactions needed to settle up, making repayments cleaner and more efficient.',
        img: '3-pairwise.jpg',
      },
    ];
    const allImgs = ['1-add_item.jpg', '2-expense.jpg', '3-pairwise.jpg', '4-wise.jpg'];
    // 建立 table
    const table = document.createElement('table');
    table.style.margin = '0 auto';
    table.style.borderCollapse = 'collapse';
    table.style.background = '#fff';
    table.style.boxShadow = '0 2px 8px #eee';
    table.style.fontSize = '1rem';
    table.style.width = '100%';
    table.style.maxWidth = '900px';
    // 2x2 圖片 grid HTML（用一個唯一 id 方便掛事件）
    const gridId = 'splits-img-grid';
    const gridHtml = `
      <div id="${gridId}" style="display:grid; grid-template-columns:1fr 1fr; grid-template-rows:1fr 1fr; gap:8px; width:300px; height:300px;">
        ${allImgs.map((img, idx) => `<div style='width:140px; height:140px; display:flex; align-items:center; justify-content:center;'><img src='img/splits/${img}' alt='' data-img='img/splits/${img}' style='max-width:100%; max-height:100%; border-radius:8px; box-shadow:0 2px 8px #aaa; background:#fff; cursor:pointer;'/></div>`).join('')}
      </div>
    `;
    table.innerHTML = `
      <thead>
        <tr>
          <th colspan="3" style="padding:16px 8px; border:1px solid #ddd; background:#f8f9fa; color:#2c3e50; font-size:1.2rem; text-align:center; letter-spacing:1px;">Mobile App - Multi-Currency Expense Splitter</th>
        </tr>
        <tr style="background:#f8f9fa;">
          <th style="padding:8px 16px; border:1px solid #ddd;">Key features</th>
          <th style="padding:8px 16px; border:1px solid #ddd;">Description</th>
          <th style="padding:8px 16px; border:1px solid #ddd;">Image</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style="padding:8px 16px; border:1px solid #ddd; vertical-align:middle; text-align:left;">${features[0].key}</td>
          <td style="padding:8px 16px; border:1px solid #ddd; vertical-align:middle; text-align:left;">${features[0].desc}</td>
          <td style="padding:8px 16px; border:1px solid #ddd; text-align:center; vertical-align:middle;" rowspan="3">${gridHtml}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px; border:1px solid #ddd; vertical-align:middle; text-align:left;">${features[1].key}</td>
          <td style="padding:8px 16px; border:1px solid #ddd; vertical-align:middle; text-align:left;">${features[1].desc}</td>
        </tr>
        <tr>
          <td style="padding:8px 16px; border:1px solid #ddd; vertical-align:middle; text-align:left;">${features[2].key}</td>
          <td style="padding:8px 16px; border:1px solid #ddd; vertical-align:middle; text-align:left;">${features[2].desc}</td>
        </tr>
      </tbody>
    `;
    gallery.appendChild(table);
    gallery.style.display = 'block';

    // Modal for image preview
    if (!document.getElementById('splits-img-modal')) {
      const modal = document.createElement('div');
      modal.id = 'splits-img-modal';
      modal.style.display = 'none';
      modal.style.position = 'fixed';
      modal.style.left = '0';
      modal.style.top = '0';
      modal.style.width = '100vw';
      modal.style.height = '100vh';
      modal.style.background = 'rgba(0,0,0,0.7)';
      modal.style.justifyContent = 'center';
      modal.style.alignItems = 'center';
      modal.style.zIndex = '9999';
      modal.innerHTML = `
        <div style="position:relative; max-width:90vw; max-height:90vh; display:flex; align-items:center; justify-content:center;">
          <img id="splits-img-modal-img" src="" style="max-width:90vw; max-height:80vh; border-radius:12px; box-shadow:0 4px 24px #000; background:#fff;" />
          <span id="splits-img-modal-close" style="position:absolute; top:-32px; right:0; color:#fff; font-size:2.5rem; cursor:pointer;">&times;</span>
        </div>
      `;
      document.body.appendChild(modal);
      // 關閉事件
      modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.id === 'splits-img-modal-close') {
          modal.style.display = 'none';
        }
      });
    }
    // 綁定點擊事件
    setTimeout(() => {
      const grid = document.getElementById(gridId);
      if (grid) {
        grid.querySelectorAll('img[data-img]').forEach(img => {
          img.addEventListener('click', function() {
            const modal = document.getElementById('splits-img-modal');
            const modalImg = document.getElementById('splits-img-modal-img');
            modalImg.src = this.getAttribute('data-img');
            modal.style.display = 'flex';
          });
        });
      }
    }, 0);
  }
  showSplitsGallery();

  function scrollToProjectsIfSplitsHash() {
    if (window.location.hash.includes('#splits')) {
      const projectSection = document.getElementById('projects');
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
  window.addEventListener('hashchange', scrollToProjectsIfSplitsHash);
  scrollToProjectsIfSplitsHash();
});
