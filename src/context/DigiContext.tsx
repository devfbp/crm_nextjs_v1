"use client";
import React, {
  MutableRefObject,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

interface DigiContextData {
  isSettingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  settingsRef: MutableRefObject<HTMLDivElement | null>;
  toggleTheme: (newTheme: string) => void;
  themeQuickToggle: () => void;
  toggleScreenSize: () => void;
  currentTheme: string;
  isFullscreen: boolean;
  calculatorRef: MutableRefObject<HTMLDivElement | null>;
  calculatorShow: boolean;
  toggleCalculator: () => void;
  currentNav: string;
  toggleNav: (newNav: string) => void;
  navQuickToggle: () => void;
  headerDropdownRef: MutableRefObject<HTMLDivElement | null>;
  headerDropdownShow: boolean;
  toggleHeaderDropdown: () => void;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  headerSidebarShow: boolean;
  closeHeaderSidebar: () => void;
  layout: string;
  toggleLayout: (newLayout: string) => void;
  rtlDirection: boolean;
  toggleLtrDirection: () => void;
  toggleRtlDirection: () => void;
  sidebarBackgroundImg: string;
  toggleSidebarBackground: (img: string) => void;
  mainBackgroundImg: string;
  toggleMainBackground: (img: string) => void;
  isTimerState: TimerState;
  showAddNewTaskModal: boolean;
  handleShowAddNewTaskModal: () => void;
  handleCloseAddNewTaskModal: () => void;
  dropdown: boolean;
  headerRef: MutableRefObject<HTMLDivElement | null>;
  toggleDropdown: () => void;
  filterDropdown: boolean;
  headerFilterRef: MutableRefObject<HTMLDivElement | null>;
  toggleFilterDropdown: () => void;
  editTaskModalOpen: boolean;
  handleEditTaskModalOpen: () => void;
  handleEditTaskModalClose: () => void;
  viewTaskModalOpen: boolean;
  handleViewTaskModalOpen: () => void;
  handleViewTaskModalClose: () => void;
  showVoiceCall: boolean;
  showVideoCall: boolean;
  handleCloseVoiceCall: () => void;
  handleShowVoiceCall: () => void;
  handleCloseVideoCall: () => void;
  handleShowVideoCall: () => void;
  uploadModalOpen: boolean;
  handleUploadModalShow: () => void;
  handleUploadModalClose: () => void;
  newFolderModal: boolean;
  handleNewFolderModalClose: () => void;
  handleNewFolderModalOpen: () => void;
  fileDeatailsModalOpen: boolean;
  handleFileDetailsModalShow: () => void;
  handleFileDetailsModalClose: () => void;
  searchInChat: boolean;
  toggleSearchOpen: () => void;
  showComposeMail: boolean;
  handleComposeMailOpen: () => void;
  handleComposeMailClose: () => void;
  showMailModal: boolean;
  handleMailClose: () => void;
  handleMailOpen: () => void;
  mailDetailsOpen: boolean;
  handleMailDetailsBtn: () => void;
  handleMailDetailClose: () => void;
  handleHover: (isHovered: boolean) => void;
  mainSidebarDropdown: string[];
  toggleMainSidebarDropdown: (item: string) => void;
  openSubMenu: string;
  toggleSubMenu: (sub: string) => void;
  sidebarRef: MutableRefObject<HTMLDivElement | null>;
  rootLayoutRef: MutableRefObject<HTMLDivElement | null>;
  mainHeaderRef: MutableRefObject<HTMLDivElement | null>;
  smallDevice: boolean;
  mainRef: MutableRefObject<HTMLDivElement | null>;
  isRechartHeight: number | undefined;
  mediumDevice: boolean;
  mobileEmailBtn: boolean;
  handleMobileEmailBtn: () => void;
  emailRef: MutableRefObject<HTMLDivElement | null>;
  mobileFileManagerBtn: boolean;
  handleMobileFileManagerBtn: () => void;
  fileManagerRef: MutableRefObject<HTMLDivElement | null>;
}
type TimerState = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const DigiContext = createContext<DigiContextData | undefined>(undefined);

interface DigiProviderProps {
  children: React.ReactNode;
}

export const DigiProvider = ({ children }: DigiProviderProps) => {
  // All the Context or Functions of FBPcrm

  //   Theme Selection
  const defaultTheme = process.env.NEXT_PUBLIC_DEFAULT_THEME || "light";
  const blueTheme = "blue";
  const darkTheme = "dark";

  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const toggleTheme = (newTheme: string) => {
    setCurrentTheme(newTheme);
  };
  const themeQuickToggle = () => {
    setCurrentTheme((currentTheme) =>
      currentTheme === darkTheme ? defaultTheme : darkTheme
    );
  };

  useEffect(() => {
    switch (currentTheme) {
      case "light":
        // Check if light-theme is present, add if not
        if (!document.body.classList.contains("light-theme")) {
          document.body.classList.add("light-theme");
          document.body.classList.remove("dark-theme");
        }
        break;
      case "blue":
        // Remove light-theme and dark-theme if they exist
        document.body.classList.remove("light-theme", "dark-theme");
        // Add blue-theme class
        document.body.classList.add("blue-theme");
        break;
      case "dark":
        // Remove light-theme if it exists, replace with dark-theme
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
        break;
      default:
        console.warn(`Unrecognized theme: ${currentTheme}`);
      // Add default theme logic here, if needed
    }
  }, [currentTheme]);

  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const rootLayoutRef = useRef<HTMLDivElement | null>(null);
  const mainHeaderRef = useRef<HTMLDivElement | null>(null);
  //   Nav Selection
  const defaultNav = "default-nav";
  const smallNav = "small-nav";
  const hoverNav = "hover-nav";

  const [currentNav, setCurrentNav] = useState(defaultNav);

  const toggleNav = (newNav: string) => {
    setCurrentNav(newNav);
  };
  const handleHover = (isHovered: boolean) => {
    setCurrentNav(isHovered ? hoverNav : "not-hovered");
  };
  const clickOutsideHandler = (event: MouseEvent) => {
    // Check if the click is outside the sidebar
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      !(event.target as HTMLElement).classList.contains("sidebar-toggle")
    ) {
      sidebarRef.current?.classList.remove("sidebar-mini");
      document.removeEventListener("click", clickOutsideHandler);
    }
  };
  const clickTwoColumnOutsideHandler = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node) &&
      sidebarRef.current.classList.contains("two-column-mobile") &&
      layout === twoColumnLayout &&
      mediumDevice
    ) {
      sidebarRef.current.classList.add("sub-menu-collapsed");
      document.removeEventListener("click", clickTwoColumnOutsideHandler);
    }
  };

  const navQuickToggle = () => {
    if (layout === "two-column" && !mediumDevice) {
      if (sidebarRef.current?.classList.contains("vertical-menu")) {
        sidebarRef.current?.classList.remove("vertical-menu");
        sidebarRef.current?.classList.add("sub-menu-collapsed");
        rootLayoutRef.current?.classList.add("expanded");
        mainHeaderRef.current?.classList.add("expanded", "reset");
        setOpenSubMenu("");
      } else {
        sidebarRef.current?.classList.add("vertical-menu");
        sidebarRef.current?.classList.remove("sub-menu-collapsed");
        rootLayoutRef.current?.classList.remove("expanded");
        mainHeaderRef.current?.classList.remove("expanded", "reset");
      }
    } else if (mediumDevice) {
      // Toggle sidebar-mini class
      if (layout === twoColumnLayout) {
        if (sidebarRef.current?.classList.contains("two-column-mobile")) {
          sidebarRef.current?.classList.remove("two-column-mobile");
          sidebarRef.current?.classList.add("sub-menu-collapsed");
          document.removeEventListener("click", clickTwoColumnOutsideHandler);
        } else {
          sidebarRef.current?.classList.add("two-column-mobile");
          sidebarRef.current?.classList.remove("sub-menu-collapsed");
          document.addEventListener("click", clickTwoColumnOutsideHandler);
          setOpenSubMenu("");
        }
      } else {
        if (sidebarRef.current?.classList.contains("sidebar-mini")) {
          sidebarRef.current?.classList.remove("sidebar-mini");
          document.removeEventListener("click", clickOutsideHandler);
        } else {
          sidebarRef.current?.classList.add("sidebar-mini");
          document.addEventListener("click", clickOutsideHandler);
        }
      }
    } else if (!mediumDevice) {
      setCurrentNav((currentNav) =>
        currentNav === smallNav ? defaultNav : smallNav
      );
    }
  };

  useEffect(() => {
    if (sidebarRef) {
      // Remove all extra added classes from the sidebarRef
      sidebarRef.current?.classList.remove(
        "collapsed",
        "vertical-menu",
        "sidebar-hover",
        "hoverable"
      );
      rootLayoutRef.current?.classList.remove(
        "expanded",
        "overflow-hidden",
        "hover-menu"
      );

      mainHeaderRef.current?.classList.remove("expanded");
      // Apply classes based on the currentNav
      if (currentNav === smallNav) {
        sidebarRef.current?.classList.add("collapsed");
        rootLayoutRef.current?.classList.add("expanded");
        mainHeaderRef.current?.classList.add("expanded");
        setOpenSubMenu("");
      } else if (currentNav === hoverNav) {
        sidebarRef.current?.classList.remove("sidebar-hover");
        rootLayoutRef.current?.classList.add("overflow-hidden");
      } else if (currentNav === "not-hovered") {
        sidebarRef.current?.classList.add("hoverable", "sidebar-hover");
        rootLayoutRef.current?.classList.add("expanded", "hover-menu");
        mainHeaderRef.current?.classList.add("expanded");
        setOpenSubMenu("");
      }
    }
  }, [currentNav, sidebarRef]);
  // Website Layout
  const defaultLayout = "default";
  const horizontalLayout = "horizontal";
  const twoColumnLayout = "two-column";
  const flushLayout = "flush";
  const [layout, setLayout] = useState(defaultLayout);
  const toggleLayout = (newLayout: string) => {
    setLayout(newLayout);
  };

  const [mainSidebarDropdown, setMainSidebarDropdown] = useState<string[]>([
    "dashboard",
    "apps",
    "pages",
    "component",
  ]);
  const toggleMainSidebarDropdown = (item: string) => {
    if (mainSidebarDropdown.includes(item)) {
      setMainSidebarDropdown(
        mainSidebarDropdown.filter((dropdown) => dropdown !== item)
      );
    } else {
      setMainSidebarDropdown([...mainSidebarDropdown, item]);
    }
  };
  const mainRef = useRef<HTMLDivElement | null>(null);
  const handleMainOutsideClick = (event: MouseEvent) => {
    if (mainRef.current && !mainRef.current.contains(event.target as Node)) {
      if (layout === horizontalLayout) {
        setMainSidebarDropdown([]);
      } else if (currentNav === smallNav) {
        setOpenSubMenu("");
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleMainOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleMainOutsideClick);
    };
  }, [layout, currentNav]);

  // Subdropdown Menu
  const [openSubMenu, setOpenSubMenu] = useState<string>("");
  const toggleSubMenu = (sub: string) => {
    setOpenSubMenu((prevState) => (prevState === sub ? "" : sub));
  };

  useEffect(() => {
    if (sidebarRef) {
      // Remove classes added by previous layouts
      sidebarRef.current?.classList.remove(
        "horizontal-menu",
        "two-column-menu",
        "collapsed",
        "flush-menu",
        "open-sub",
        "reset",
        "sidebar-mini",
        "vertical-menu",
        "sub-menu-collapsed",
        "sidebar-hover",
        "hoverable",
        "flush-menu",
        "two-column-mobile"
      );
      rootLayoutRef.current?.classList.remove(
        "has-horizontal",
        "has-two-column-menu",
        "has-fixed-sidebar",
        "expanded",
        "reset",
        "overflow-hidden",
        "hover-menu"
      );
      mainHeaderRef.current?.classList.remove("expanded", "reset");

      // Apply classes based on the new layout
      if (layout === horizontalLayout) {
        sidebarRef.current?.classList.add("open-sub", "horizontal-menu");
        rootLayoutRef.current?.classList.add(
          "overflow-hidden",
          "has-horizontal"
        );
        setMainSidebarDropdown([""]);
        setCurrentNav("default");
      } else if (layout === twoColumnLayout && !mediumDevice) {
        sidebarRef.current?.classList.add(
          "vertical-menu",
          "two-column-menu",
          "collapsed"
        );
        rootLayoutRef.current?.classList.add(
          "has-two-column-menu",
          "has-fixed-sidebar"
        );
        setMainSidebarDropdown(["dashboard", "apps", "pages", "component"]);
      } else if (layout === twoColumnLayout && mediumDevice) {
        sidebarRef.current?.classList.add(
          "sidebar-mini",
          "two-column-menu",
          "collapsed",
          "two-column-mobile"
        );
        rootLayoutRef.current?.classList.add(
          "overflow-hidden",
          "has-two-column-menu"
        );
        setMainSidebarDropdown(["dashboard", "apps", "pages", "component"]);
      } else if (layout === flushLayout) {
        sidebarRef.current?.classList.add("flush-menu");
        rootLayoutRef.current?.classList.add("overflow-hidden");
        setMainSidebarDropdown(["dashboard", "apps", "pages", "component"]);
        setCurrentNav(defaultNav);
      } else if (layout === defaultLayout) {
        setMainSidebarDropdown(["dashboard", "apps", "pages", "component"]);
        rootLayoutRef.current?.classList.remove("has-horizontal");
        setCurrentNav(defaultNav);
      }
    }
  }, [layout, sidebarRef]);

  // settings btn
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const settingsRef = useRef<HTMLDivElement | null>(null);

  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  const closeSettings = () => {
    setIsSettingsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      settingsRef.current &&
      !settingsRef.current.contains(event.target as Node)
    ) {
      setIsSettingsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Recharts Height
  const [isRechartHeight, setIsRechartHeight] = useState<number>();

  const setRechartHeight = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth >= 1800) {
      setIsRechartHeight(407);
    } else if (screenWidth >= 1200 && screenWidth < 1800) {
      setIsRechartHeight(425);
    } else if (screenWidth >= 992 && screenWidth < 1200) {
      setIsRechartHeight(369);
    } else if (screenWidth >= 768 && screenWidth < 992) {
      setIsRechartHeight(365);
    } else if (screenWidth >= 576 && screenWidth < 768) {
      setIsRechartHeight(350);
    } else if (screenWidth >= 478 && screenWidth < 576) {
      setIsRechartHeight(354);
    } else if (screenWidth >= 320 && screenWidth < 478) {
      setIsRechartHeight(250);
    } else {
      setIsRechartHeight(250);
    }
  };

  useEffect(() => {
    setRechartHeight();

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target instanceof HTMLElement) {
          setRechartHeight();
        }
      }
    });

    resizeObserver.observe(document.documentElement);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Mobile File Manager btn
  const [mobileFileManagerBtn, setMobileFileManagerBtn] =
    useState<boolean>(false);

  const handleMobileFileManagerBtn = () => {
    setMobileFileManagerBtn(
      (prevMobileFileManagerBtn) => !prevMobileFileManagerBtn
    );
  };

  const fileManagerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileFileManagerBtn &&
        !(event.target as HTMLElement).closest(".file-manager-sidebar") &&
        !(event.target as HTMLElement).closest(".mobile-file-manager-btn")
      ) {
        setMobileFileManagerBtn(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileFileManagerBtn]);

  //   Fullscreen function
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const toggleScreenSize = () => {
    setIsFullscreen((prevState) => !prevState);
    if (!isFullscreen) {
      document.documentElement.requestFullscreen(); // Corrected method name
    } else {
      document.exitFullscreen();
    }
  };

  // Calculator functions
  const calculatorRef = useRef<HTMLDivElement>(null); // Ref for the calculator dropdown
  const [calculatorShow, setCalculatorShow] = useState(false);

  const toggleCalculator = () => setCalculatorShow((prev) => !prev);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        calculatorRef.current &&
        !calculatorRef.current.contains(event.target as Node)
      ) {
        setCalculatorShow(false);
      }
    };

    // Attach and clean up event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  // headerSidebar functions
  const headerDropdownRef = useRef<HTMLDivElement>(null); // Ref for the header dropdown

  const [headerDropdownShow, setHeaderDropdownShow] = useState(false);

  const toggleHeaderDropdown = () => setHeaderDropdownShow((prev) => !prev);

  const closeHeaderSidebar = () => {
    setHeaderSidebarShow(false);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        headerDropdownRef.current &&
        !headerDropdownRef.current.contains(event.target as Node)
      ) {
        setHeaderDropdownShow(false);
      }
    };

    // Attach and clean up event listener
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  const [headerSidebarShow, setHeaderSidebarShow] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setHeaderSidebarShow(isChecked);
  };

  // Email Section Mobile
  const [mobileEmailBtn, setMobileEmailBtn] = useState<boolean>(false);

  const handleMobileEmailBtn = () => {
    setMobileEmailBtn(!mobileEmailBtn);
  };

  const emailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the sidebar is open and the clicked element is not inside the sidebar
      if (
        mobileEmailBtn &&
        event.target &&
        !(event.target as HTMLElement).closest(".panel-body.email-menu") &&
        !(event.target as HTMLElement).closest(".mobile-email-btn")
      ) {
        setMobileEmailBtn(false);
      }
    };

    // Bind the event listener to detect clicks outside the sidebar
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileEmailBtn]);

  // Small Screen
  const [smallDevice, setSmallDevice] = useState(false);

  useEffect(() => {
    if (rootLayoutRef.current) {
      const handleResize = () => {
        const updatedWidth = rootLayoutRef.current?.offsetWidth ?? 0; // Nullish coalescing operator for default value
        setSmallDevice(updatedWidth < 576);
      };

      // Initial width check
      handleResize();

      // Add resize observer for dynamic updates
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(rootLayoutRef.current);

      return () => {
        resizeObserver.disconnect(); // Cleanup function for resize observer
      };
    }
  }, [rootLayoutRef]);

  // Small Screen
  const [mediumDevice, setMediumDevice] = useState(false);

  useEffect(() => {
    if (rootLayoutRef.current) {
      const handleResize = () => {
        const updatedWidth = rootLayoutRef.current?.offsetWidth ?? 0; // Nullish coalescing operator for default value
        setMediumDevice(updatedWidth < 1200);
      };

      // Initial width check
      handleResize();

      // Add resize observer for dynamic updates
      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(rootLayoutRef.current);
      return () => {
        resizeObserver.disconnect(); // Cleanup function for resize observer
      };
    }
  }, [rootLayoutRef]);

  useEffect(() => {
    if (mediumDevice) {
      setCurrentNav("");
    }
  }, [mediumDevice]);

  // Website Direction
  const [rtlDirection, setRtlDirection] = useState(false);

  const toggleLtrDirection = () => {
    setRtlDirection(false);
  };

  const toggleRtlDirection = () => {
    setRtlDirection(true);
  };
  useEffect(() => {
    if (rtlDirection) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/assets/css/rtl-style.css";
      document.head.appendChild(link);

      // Cleanup function to remove the link
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [rtlDirection]);

  // Sidebar Background Image Change

  const [sidebarBackgroundImg, setSidebarBackgroundImg] = useState("");
  const toggleSidebarBackground = (img: string) => {
    setSidebarBackgroundImg(img);
  };

  // Main Background Image Change

  const [mainBackgroundImg, setMainBackgroundImg] = useState("");
  const toggleMainBackground = (img: string) => {
    setMainBackgroundImg(img);
  };

  // Custom Countdown Timer
  const countdownDate = new Date(
    Date.now() + 365 * 24 * 60 * 60 * 1000
  ).getTime();
  const [isTimerState, setIsTimerState] = useState<TimerState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Update timer state every second
  useEffect(() => {
    const interval = setInterval(setNewTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate new timer state
  const setNewTime = () => {
    if (countdownDate) {
      const currentTime = new Date().getTime();
      const distanceToDate = countdownDate - currentTime;

      // Calculate days, hours, minutes, and seconds
      const days: number = Math.floor(distanceToDate / (1000 * 60 * 60 * 24));
      const hours: number = Math.floor(
        (distanceToDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes: number = Math.floor(
        (distanceToDate % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds: number = Math.floor((distanceToDate % (1000 * 60)) / 1000);

      // Update timer state
      setIsTimerState({ days, hours, minutes, seconds });
    }
  };

  // Add new task modal
  const [showAddNewTaskModal, setShowAddNewTaskModal] = useState(false);

  const handleShowAddNewTaskModal = () => {
    setShowAddNewTaskModal(true);
  };

  const handleCloseAddNewTaskModal = () => {
    setShowAddNewTaskModal(false);
  };

  // Table Header
  const [dropdown, setDropdown] = useState<boolean>(false);
  const headerRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setDropdown((prevState) => !prevState);
  };

  const handleHeaderClickOutside = (event: MouseEvent) => {
    if (
      headerRef.current &&
      !headerRef.current.contains(event.target as Node)
    ) {
      setDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleHeaderClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleHeaderClickOutside);
    };
  }, []);

  // Table Filter Header
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const headerFilterRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => {
    setFilterDropdown((prevState) => !prevState);
  };

  const handleHeaderFilterClickOutside = (event: MouseEvent) => {
    if (
      headerFilterRef.current &&
      !headerFilterRef.current.contains(event.target as Node)
    ) {
      setFilterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleHeaderFilterClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleHeaderFilterClickOutside);
    };
  }, []);

  // Edit Task Modal
  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);

  const handleEditTaskModalOpen = () => {
    setEditTaskModalOpen(true);
  };

  const handleEditTaskModalClose = () => {
    setEditTaskModalOpen(false);
  };

  // View Task Modal
  const [viewTaskModalOpen, setViewTaskModalOpen] = useState(false);

  const handleViewTaskModalOpen = () => {
    setViewTaskModalOpen(true);
  };

  const handleViewTaskModalClose = () => {
    setViewTaskModalOpen(false);
  };

  // chat modal
  const [showVoiceCall, setShowVoiceCall] = useState(false);
  const handleCloseVoiceCall = () => {
    setShowVoiceCall(false);
  };
  const handleShowVoiceCall = () => {
    setShowVoiceCall(true);
  };
  const [showVideoCall, setShowVideoCall] = useState(false);
  const handleCloseVideoCall = () => {
    setShowVideoCall(false);
  };
  const handleShowVideoCall = () => {
    setShowVideoCall(true);
  };

  // File upload modal
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const handleUploadModalShow = () => {
    setUploadModalOpen(true);
  };
  const handleUploadModalClose = () => {
    setUploadModalOpen(false);
  };

  // Create new folder modal
  const [newFolderModal, setNewFolderModal] = useState(false);
  const handleNewFolderModalClose = () => {
    setNewFolderModal(false);
  };
  const handleNewFolderModalOpen = () => {
    setNewFolderModal(true);
  };

  // file details modal
  const [fileDeatailsModalOpen, setFileDetailsModalOpen] = useState(false);

  const handleFileDetailsModalShow = () => {
    setFileDetailsModalOpen(true);
  };
  const handleFileDetailsModalClose = () => {
    setFileDetailsModalOpen(false);
  };
  // Chat Search
  const [searchInChat, setSearchInChat] = useState(false);

  const toggleSearchOpen = () => {
    setSearchInChat(!searchInChat);
  };

  // Compose mail modal
  const [showComposeMail, setShowComposeMail] = useState(false);
  const handleComposeMailOpen = () => {
    setShowComposeMail(true);
  };
  const handleComposeMailClose = () => {
    setShowComposeMail(false);
  };

  // Mail Details Modal
  const [showMailModal, setShowMailModal] = useState(false);
  const handleMailClose = () => {
    setShowMailModal(false);
  };
  const handleMailOpen = () => {
    setShowMailModal(true);
  };

  // Mail details

  const [mailDetailsOpen, setMailDetailsOpen] = useState(false);

  const handleMailDetailsBtn = () => {
    setMailDetailsOpen(true);
  };
  const handleMailDetailClose = () => {
    setMailDetailsOpen(false);
  };

  // Define the context value based on the interface
  const contextValue: DigiContextData = {
    isSettingsOpen,
    openSettings,
    closeSettings,
    settingsRef,
    toggleTheme,
    themeQuickToggle,
    toggleScreenSize,
    currentTheme,
    isFullscreen,
    calculatorRef,
    calculatorShow,
    toggleCalculator,
    currentNav,
    toggleNav,
    navQuickToggle,
    headerDropdownRef,
    headerDropdownShow,
    toggleHeaderDropdown,
    headerSidebarShow,
    handleCheckboxChange,
    closeHeaderSidebar,
    layout,
    toggleLayout,
    rtlDirection,
    toggleLtrDirection,
    toggleRtlDirection,
    sidebarBackgroundImg,
    toggleSidebarBackground,
    mainBackgroundImg,
    toggleMainBackground,
    isTimerState,
    showAddNewTaskModal,
    handleShowAddNewTaskModal,
    handleCloseAddNewTaskModal,
    dropdown,
    headerRef,
    toggleDropdown,
    filterDropdown,
    headerFilterRef,
    toggleFilterDropdown,
    editTaskModalOpen,
    handleEditTaskModalOpen,
    handleEditTaskModalClose,
    viewTaskModalOpen,
    handleViewTaskModalOpen,
    handleViewTaskModalClose,
    showVoiceCall,
    showVideoCall,
    handleCloseVoiceCall,
    handleShowVoiceCall,
    handleCloseVideoCall,
    handleShowVideoCall,
    uploadModalOpen,
    handleUploadModalShow,
    handleUploadModalClose,
    newFolderModal,
    handleNewFolderModalClose,
    handleNewFolderModalOpen,
    fileDeatailsModalOpen,
    handleFileDetailsModalShow,
    handleFileDetailsModalClose,
    searchInChat,
    toggleSearchOpen,
    showComposeMail,
    handleComposeMailOpen,
    handleComposeMailClose,
    showMailModal,
    handleMailClose,
    handleMailOpen,
    mailDetailsOpen,
    handleMailDetailsBtn,
    handleMailDetailClose,
    handleHover,
    toggleMainSidebarDropdown,
    mainSidebarDropdown,
    openSubMenu,
    toggleSubMenu,
    sidebarRef,
    rootLayoutRef,
    mainHeaderRef,
    smallDevice,
    mainRef,
    isRechartHeight,
    mediumDevice,
    mobileEmailBtn,
    handleMobileEmailBtn,
    emailRef,
    mobileFileManagerBtn,
    handleMobileFileManagerBtn,
    fileManagerRef,
  };

  // Return Statement
  return (
    <DigiContext.Provider value={contextValue}>{children}</DigiContext.Provider>
  );
};

// Custom Context Hook
export const useDigiContext = () => {
  const context = useContext(DigiContext);
  if (!context) {
    throw new Error("useDigiContext must be used within an DigiProvider");
  }
  return context;
};
